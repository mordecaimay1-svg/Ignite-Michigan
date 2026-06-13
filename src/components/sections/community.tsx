import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "A Welcoming Community",
    description:
      "Whether you're new to civic engagement or a seasoned participant, you'll find a place here.",
  },
  {
    icon: MapPin,
    title: "Connected Across Michigan",
    description:
      "Events, resources, and community gatherings bringing people together statewide.",
  },
  {
    icon: Heart,
    title: "People Who Care",
    description:
      "Join citizens who believe Michigan's best days are ahead — and are willing to work for it.",
  },
];

export function CommunitySection() {
  return (
    <section className="section-padding bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Get Involved
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            You belong here
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Ignite Michigan is for anyone who wants to learn more, connect with
            others, and play a part in Michigan&apos;s future. No experience required.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="glass-card h-full p-8 transition-colors hover:border-[var(--gold)]/30">
                <item.icon className="h-8 w-8 text-[var(--gold)]" />
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Button asChild size="lg" className="btn-movement">
            <Link href="/auth/signup">Join the Movement</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
