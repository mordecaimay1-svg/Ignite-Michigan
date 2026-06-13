import { SiteLayout } from "@/components/layout/site-layout";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <Tabs defaultValue="general" className="mx-auto max-w-xl">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="general">Volunteer</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="prayer">Prayer</TabsTrigger>
                <TabsTrigger value="county_rep">County</TabsTrigger>
              </TabsList>
              {OPTIONS.map((opt) => (
                <TabsContent key={opt.id} value={opt.id}>
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Apply: {opt.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <VolunteerForm defaultType={opt.id} />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  );
}
