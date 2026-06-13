import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaBlock } from "@/components/shared/cta-block";
import { createMetadata } from "@/lib/metadata";
import { Users, MapPin, BookOpen } from "lucide-react";

export const metadata = createMetadata({
  title: "Our Community",
  description: "How Ignite Michigan connects, educates, and mobilizes citizens across the state.",
  path: "/movement",
});

const STRUCTURE = [
  {
    icon: Users,
    title: "Members",
    desc: "Citizens who want to learn, connect, and participate in Michigan's civic life.",
  },
  {
    icon: MapPin,
    title: "Local Communities",
    desc: "County and regional gatherings that bring people together where they live.",
  },
  {
    icon: BookOpen,
    title: "Resources & Events",
    desc: "Educational content, meetings, and opportunities to get involved.",
  },
];

export default function MovementPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-20 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold sm:text-5xl">Our Community</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              A statewide network of citizens connected through education, events,
              and civic engagement.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-[var(--navy)]">How It Works</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Ignite Michigan is built on connection. Members join the community,
              attend events, access educational resources, and participate at whatever
              level feels right for them. There is no complex structure — just people
              who care about Michigan working together.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold text-[var(--navy)]">
              Community Structure
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STRUCTURE.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl border bg-card p-8 text-center">
                  <item.icon className="mx-auto h-10 w-10 text-[var(--gold)]" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-[var(--navy)]">Ready to connect?</h2>
            <p className="mt-4 text-muted-foreground">
              Join the community and start participating today.
            </p>
            <Link
              href="/auth/signup"
              className="mt-6 inline-block font-semibold text-[var(--ember)] hover:underline"
            >
              Join the Movement →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CtaBlock
        title="Get Connected"
        description="Become part of a welcoming community of Michiganders who care about civic engagement."
        primaryHref="/auth/signup"
        primaryLabel="Join the Movement"
      />
    </SiteLayout>
  );
}
