/**
 * HubSpot CRM integration (server-side only).
 *
 * Required env var:
 *   HUBSPOT_ACCESS_TOKEN — Private App access token from HubSpot
 *     Settings → Integrations → Private Apps → Create app
 *     Scopes needed: crm.objects.contacts.write, crm.objects.contacts.read
 *
 * Optional custom contact property (create in HubSpot first):
 *   Settings → Properties → Contact properties → Create property
 *   Label: "Volunteer Interest" | Internal name: volunteer_interest | Type: Single-line text
 *
 * Portal ID (for tracking script only, safe to expose via NEXT_PUBLIC_):
 *   HUBSPOT_PORTAL_ID or NEXT_PUBLIC_HUBSPOT_PORTAL_ID — e.g. 246483144
 */

export type HubSpotContact = {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  city?: string;
  county?: string;
  lifecyclestage?: string;
  lead_source?: string;
  /** Maps to custom property "volunteer_interest" — create in HubSpot CRM first. */
  volunteer_interest?: string;
};

type HubSpotResult = { ok: boolean; skipped?: boolean; error?: string };

function buildProperties(contact: HubSpotContact): Record<string, string> {
  const entries: [string, string | undefined][] = [
    ["email", contact.email],
    ["firstname", contact.firstname],
    ["lastname", contact.lastname],
    ["phone", contact.phone],
    ["city", contact.city],
    ["county", contact.county],
    ["lifecyclestage", contact.lifecyclestage ?? "lead"],
    ["lead_source", contact.lead_source],
    ["volunteer_interest", contact.volunteer_interest],
  ];

  return Object.fromEntries(
    entries.filter(
      (entry): entry is [string, string] =>
        entry[1] !== undefined && entry[1] !== ""
    )
  );
}

/**
 * Create or update a HubSpot contact by email (CRM v3 batch upsert).
 * Credentials never leave the server — call only from API routes or server actions.
 */
export async function upsertHubSpotContact(
  contact: HubSpotContact
): Promise<HubSpotResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.warn("[HubSpot] HUBSPOT_ACCESS_TOKEN not set — contact sync skipped");
    return { ok: true, skipped: true };
  }

  if (!contact.email) {
    return { ok: false, error: "Email is required for HubSpot sync" };
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
              id: contact.email,
              properties: buildProperties(contact),
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[HubSpot] Upsert failed:", res.status, text);
      return { ok: false, error: text };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "HubSpot sync failed";
    console.error("[HubSpot]", message);
    return { ok: false, error: message };
  }
}

/** @deprecated Use upsertHubSpotContact — kept for newsletter/volunteer server actions. */
export async function syncContactToHubSpot(
  contact: HubSpotContact
): Promise<HubSpotResult> {
  return upsertHubSpotContact(contact);
}
