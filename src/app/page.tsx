import { SiteLayout } from "@/components/layout/site-layout";
import { HeroSection } from "@/components/sections/hero";
import { VisionGoalsSection } from "@/components/sections/vision-goals";
import { MissionSection } from "@/components/sections/mission";
import { EventsPreviewSection } from "@/components/sections/events-preview";
import { WhyMovementSection } from "@/components/sections/why-movement";
import { CommunitySection } from "@/components/sections/community";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FounderSection } from "@/components/sections/founder";
import { CtaBlock } from "@/components/shared/cta-block";

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <VisionGoalsSection />
      <MissionSection />
      <EventsPreviewSection />
      <WhyMovementSection />
      <CommunitySection />
      <TestimonialsSection />
      <FounderSection />
      <CtaBlock
        title="Join the Movement"
        description="Whether you're new to civic engagement or ready to step up as a leader, there's a place for you here. Get connected today."
        primaryHref="/auth/signup"
        primaryLabel="Join the Movement"
        secondaryHref="/events"
        secondaryLabel="Attend an Event"
      />
    </SiteLayout>
  );
}
