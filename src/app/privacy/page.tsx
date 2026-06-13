import { SiteLayout } from "@/components/layout/site-layout";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Privacy Policy",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="section-padding pt-32">
        <div className="mx-auto max-w-3xl prose prose-neutral">
          <h1>Privacy Policy</h1>
          <p>
            {SITE.name} respects your privacy. Information collected through forms,
            membership accounts, and event registrations is used to operate the
            movement, send relevant communications, and improve our services.
          </p>
          <p>
            We do not sell personal data. Third-party services (Supabase, Resend,
            HubSpot when enabled) process data according to their policies.
          </p>
          <p>
            Contact {SITE.email} for privacy requests.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
