import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Ignite Michigan. Join the movement or reach our team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Ready to take action? We&apos;d love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <FadeIn>
            <Card className="h-full border-[var(--navy)]/10">
              <CardContent className="p-8">
                <Mail className="h-8 w-8 text-[var(--ember)]" />
                <h2 className="mt-4 text-xl font-semibold text-[var(--navy)]">Email</h2>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block text-muted-foreground hover:text-[var(--ember)]"
                >
                  {SITE.email}
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  For general inquiries, partnerships, and media requests.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card className="h-full border-[var(--navy)]/10">
              <CardContent className="p-8">
                <MapPin className="h-8 w-8 text-[var(--ember)]" />
                <h2 className="mt-4 text-xl font-semibold text-[var(--navy)]">Location</h2>
                <p className="mt-2 text-muted-foreground">Statewide · Michigan, USA</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Local chapters and events across Michigan. Join the movement to
                  connect with your community.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <FadeIn className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[var(--navy)]">
            The fastest way to get involved
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join thousands of Michiganders taking action for faith, freedom, and
            the future of our state.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="btn-movement">
              <Link href="/auth/signup">
                Join the Movement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/get-involved">Take Action</Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </SiteLayout>
  );
}
