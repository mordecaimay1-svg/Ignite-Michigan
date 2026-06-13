import { SiteLayout } from "@/components/layout/site-layout";
import { JoinForm } from "@/components/forms/join-form";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Heart, MapPin, Users, HandHeart } from "lucide-react";

export const metadata = createMetadata({
  title: "Get Involved",
  description: "Volunteer, lead, pray, or represent your county with Ignite Michigan.",
  path: "/get-involved",
});

const OPTIONS = [
  {
    id: "general",
    icon: Users,
    title: "Volunteer",
    desc: "Help with events, outreach, and local organizing.",
  },
  {
    id: "leadership",
    icon: HandHeart,
    title: "Leadership",
    desc: "Explore roles guiding chapters and statewide teams.",
  },
  {
    id: "prayer",
    icon: Heart,
    title: "Prayer Team",
    desc: "Cover the movement in intercession and spiritual warfare.",
  },
  {
    id: "county_rep",
    icon: MapPin,
    title: "County Rep",
    desc: "Launch or lead a county chapter where you live.",
  },
] as const;

export default function GetInvolvedPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold">Get Involved</h1>
            <p className="mt-4 max-w-xl text-white/80">
              Every gift and calling has a place in the movement.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {OPTIONS.map((opt, i) => (
              <FadeIn key={opt.id} delay={i * 0.05}>
                <Card>
                  <CardHeader>
                    <opt.icon className="h-8 w-8 text-[var(--gold)]" />
                    <CardTitle className="text-lg">{opt.title}</CardTitle>
                    <CardDescription>{opt.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <Card className="mx-auto max-w-xl">
              <CardHeader>
                <CardTitle>Join Ignite Michigan</CardTitle>
                <CardDescription>
                  Sign up to stay connected. All fields marked required must be
                  completed before submission.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JoinForm />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  );
}
