/**
 * HubSpot CRM handler for the Join Ignite Michigan form.
 *
 * Uses only standard HubSpot contact properties for the upsert, then attaches
 * volunteer/source details as a CRM note (avoids custom-property 400 errors).
 *
 * Required env var:
 *   HUBSPOT_ACCESS_TOKEN — Private App token (server-only)
 */

export type JoinHubSpotPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  volunteerInterest: "yes" | "no";
};

type JoinHubSpotResult = { ok: true } | { ok: false; error: string };

/** Standard HubSpot contact properties — safe to write without custom CRM setup. */
function toStandardProperties(
  payload: JoinHubSpotPayload
): Record<string, string> {
  const entries: [string, string | undefined][] = [
    ["email", payload.email],
    ["firstname", payload.firstName],
    ["lastname", payload.lastName],
    ["phone", payload.phone],
    ["city", payload.city],
    ["lifecyclestage", "lead"],
  ];

  return Object.fromEntries(
    entries.filter(
      (entry): entry is [string, string] =>
        entry[1] !== undefined && entry[1] !== ""
    )
  );
}

function getOptionalCustomProperties(
  payload: JoinHubSpotPayload
): Record<string, string> {
  const custom: Record<string, string> = {};

  const volunteerProperty = process.env.HUBSPOT_VOLUNTEER_PROPERTY;
  if (volunteerProperty) {
    custom[volunteerProperty] =
      payload.volunteerInterest === "yes" ? "Yes" : "No";
  }

  const leadSourceProperty = process.env.HUBSPOT_LEAD_SOURCE_PROPERTY;
  if (leadSourceProperty) {
    custom[leadSourceProperty] = "join_ignite_michigan";
  }

  return custom;
}

async function hubSpotRequest(
  token: string,
  path: string,
  body: unknown
): Promise<Response> {
  return fetch(`https://api.hubapi.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function addJoinNote(
  token: string,
  contactId: string,
  payload: JoinHubSpotPayload
): Promise<void> {
  const volunteerLabel =
    payload.volunteerInterest === "yes" ? "Yes" : "No";

  const res = await hubSpotRequest(token, "/crm/v3/objects/notes", {
    properties: {
      hs_note_body: [
        "Join Ignite Michigan form submission",
        `Volunteer interest: ${volunteerLabel}`,
        "Source: join_ignite_michigan",
      ].join("\n"),
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 202,
          },
        ],
      },
    ],
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn("[HubSpot Join] Note creation failed:", res.status, text);
  }
}

/** Create or update a HubSpot contact from a join form submission. */
export async function submitJoinContactToHubSpot(
  payload: JoinHubSpotPayload
): Promise<JoinHubSpotResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return {
      ok: false,
      error: "HUBSPOT_ACCESS_TOKEN is not configured",
    };
  }

  const properties = {
    ...toStandardProperties(payload),
    ...getOptionalCustomProperties(payload),
  };

  try {
    let res = await hubSpotRequest(
      token,
      "/crm/v3/objects/contacts/batch/upsert",
      {
        inputs: [
          {
            idProperty: "email",
            id: payload.email,
            properties,
          },
        ],
      }
    );

    // Retry with standard properties only if custom properties caused a 400.
    if (!res.ok && res.status === 400 && Object.keys(getOptionalCustomProperties(payload)).length > 0) {
      console.warn("[HubSpot Join] Retrying upsert with standard properties only");
      res = await hubSpotRequest(
        token,
        "/crm/v3/objects/contacts/batch/upsert",
        {
          inputs: [
            {
              idProperty: "email",
              id: payload.email,
              properties: toStandardProperties(payload),
            },
          ],
        }
      );
    }

    if (!res.ok) {
      const text = await res.text();
      console.error("[HubSpot Join] Upsert failed:", res.status, text);
      return { ok: false, error: text };
    }

    const data = (await res.json()) as {
      results?: Array<{ id: string }>;
    };
    const contactId = data.results?.[0]?.id;

    if (contactId) {
      await addJoinNote(token, contactId, payload);
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "HubSpot sync failed";
    console.error("[HubSpot Join]", message);
    return { ok: false, error: message };
  }
}
