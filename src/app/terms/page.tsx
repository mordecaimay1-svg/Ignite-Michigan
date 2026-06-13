import { SiteLayout } from "@/components/layout/site-layout";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Terms of Use",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteLayout>
      <section className="section-padding pt-32">
        <div className="mx-auto max-w-3xl prose prose-neutral">
          <h1>Terms of Use</h1>
          <p>
            By using {SITE.name}&apos;s website and member portal, you agree to
            participate respectfully and in accordance with our statement of beliefs
            and community standards.
          </p>
          <p>
            Content is provided for educational and organizing purposes. {SITE.name}{" "}
            does not guarantee specific political outcomes.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
