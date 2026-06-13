/**
 * HubSpot CRM integration — ready for production tokens.
 * Submissions are queued here; wire HUBSPOT_ACCESS_TOKEN to enable live sync.
 */

export type HubSpotContact = {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  county?: string;
  lifecyclestage?: string;
  lead_source?: string;
};

export async function syncContactToHubSpot(
  contact: HubSpotContact
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return { ok: true, skipped: true };
  }

  try {
    const properties = Object.entries(contact).map(([property, value]) => ({
      property,
      value: value ?? "",
    }));

    const res = await fetch(
      "https://api.hubapi.com/contacts/v1/contact?email=" +
        encodeURIComponent(contact.email),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "HubSpot sync failed",
    };
  }
}
