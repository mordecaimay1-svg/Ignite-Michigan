/**
 * HubSpot CRM handler for the Join Ignite Michigan form.
 *
 * This module is intentionally separate from Supabase — the join flow is:
 *   POST /api/join → validate → HubSpot CRM upsert
 *
 * Required env var (set in Vercel → Settings → Environment Variables):
 *   HUBSPOT_ACCESS_TOKEN — Private App token from HubSpot
 *     Settings → Integrations → Private Apps
 *     Scopes: crm.objects.contacts.read, crm.objects.contacts.write
 *
 * Optional custom contact property (create in HubSpot first):
 *   Internal name: volunteer_interest | Type: Single-line text or dropdown
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

function getAccessToken(): string | null {
  return process.env.HUBSPOT_ACCESS_TOKEN ?? null;
}

function toHubSpotProperties(payload: JoinHubSpotPayload): Record<string, string> {
  const entries: [string, string | undefined][] = [
    ["email", payload.email],
    ["firstname", payload.firstName],
    ["lastname", payload.lastName],
    ["phone", payload.phone],
    ["city", payload.city],
    ["lifecyclestage", "lead"],
    ["lead_source", "join_ignite_michigan"],
    [
      "volunteer_interest",
      payload.volunteerInterest === "yes" ? "Yes" : "No",
    ],
  ];

  return Object.fromEntries(
    entries.filter(
      (entry): entry is [string, string] =>
        entry[1] !== undefined && entry[1] !== ""
    )
  );
}

/** Create or update a HubSpot contact from a join form submission. */
export async function submitJoinContactToHubSpot(
  payload: JoinHubSpotPayload
): Promise<JoinHubSpotResult> {
  const token = getAccessToken();
  if (!token) {
    return {
      ok: false,
      error: "HUBSPOT_ACCESS_TOKEN is not configured",
    };
  }

  try {
    const res = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [
            {
              idProperty: "email",
              id: payload.email,
              properties: toHubSpotProperties(payload),
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[HubSpot Join] Upsert failed:", res.status, text);
      return { ok: false, error: text };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "HubSpot sync failed";
    console.error("[HubSpot Join]", message);
    return { ok: false, error: message };
  }
}
