import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FounderProfileCard } from "@/components/shared/founder-profile-card";
import { FOUNDER } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function FounderSection() {
  return (
    <section className="section-padding bg-muted/40">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <FounderProfileCard className="mx-auto max-w-sm lg:mx-0" />
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ember)]">
              Meet Our Founder
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--navy)] sm:text-4xl">
              {FOUNDER.name}
            </h2>
            <p className="mt-1 text-base font-medium text-[var(--ember)]">
              {FOUNDER.title}
            </p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              {FOUNDER.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <Button asChild className="btn-movement mt-8">
              <Link href={FOUNDER.storyHref}>
                Read David&apos;s Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
