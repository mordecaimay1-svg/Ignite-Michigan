import { SiteLayout } from "@/components/layout/site-layout";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaBlock } from "@/components/shared/cta-block";
import { FounderProfileCard } from "@/components/shared/founder-profile-card";
import { createMetadata } from "@/lib/metadata";
import { FOUNDER } from "@/lib/constants";

export const metadata = createMetadata({
  title: "About",
  description: "The story, leadership, and beliefs behind the Ignite Michigan movement.",
  path: "/about",
});

const BELIEFS = [
  "Every citizen has a role to play in shaping Michigan's future.",
  "Informed engagement leads to stronger communities and better outcomes.",
  "Connecting people who care creates lasting civic impact.",
  "Education and dialogue are the foundation of meaningful participation.",
  "Michigan thrives when its people are engaged, connected, and involved.",
];

const VALUES = [
  { title: "Welcoming", desc: "Open to everyone who wants to learn and participate." },
  { title: "Educational", desc: "Focused on helping people understand civic life clearly." },
  { title: "Connected", desc: "Building real relationships across communities." },
  { title: "Action-Oriented", desc: "Encouraging participation, not just observation." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient pb-20 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold sm:text-5xl">Our Movement</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Connecting people who care about Michigan&apos;s future — through
              education, civic engagement, and community.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-[var(--navy)]">Our Story</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Ignite Michigan was founded on a simple belief: when citizens are
              informed, connected, and engaged, communities flourish. What started
              as conversations among concerned Michiganders has grown into a
              statewide effort to educate, mobilize, and unite people around
              civic participation and public policy.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We are not a political party or a single-issue organization. We are
              a community — open to anyone who wants to learn, connect, and make
              a difference in Michigan.
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="founder" className="section-padding scroll-mt-24 bg-muted/40">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <FadeIn>
              <FounderProfileCard className="mx-auto max-w-md lg:mx-0" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ember)]">
                Meet Our Founder
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--navy)]">{FOUNDER.name}</h2>
              <p className="mt-1 font-medium text-[var(--ember)]">{FOUNDER.title}</p>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                {FOUNDER.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                <p>
                  His journey spans decades of ministry, coaching, and community
                  building — from the locker room to the pulpit to the public square.
                  David founded Ignite Michigan to give citizens a welcoming entry
                  point into civic life and a community of people who share a
                  vision for our state.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="text-2xl font-bold text-[var(--navy)]">What We Believe</h2>
            <ul className="mt-6 space-y-4">
              {BELIEFS.map((b) => (
                <li key={b} className="border-l-2 border-[var(--gold)] pl-4 text-muted-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-bold text-[var(--navy)]">Our Values</h2>
            <div className="mt-6 space-y-4">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-xl border p-4">
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBlock
        title="Get Connected"
        description="Join a welcoming community of Michiganders who care about the future of our state."
        primaryHref="/auth/signup"
        primaryLabel="Join the Movement"
        secondaryHref="/get-involved"
        secondaryLabel="Take Action"
      />
    </SiteLayout>
  );
}
