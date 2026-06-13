import { FadeIn } from "@/components/motion/fade-in";
import { Users, BookOpen, Handshake } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Build Community",
    description:
      "Connect with citizens across Michigan who share a commitment to civic engagement and public life.",
  },
  {
    icon: BookOpen,
    title: "Educate & Inform",
    description:
      "Access clear, practical resources on civic participation, public policy, and community leadership.",
  },
  {
    icon: Handshake,
    title: "Encourage Participation",
    description:
      "Take meaningful steps toward involvement — whether attending events, volunteering, or simply staying informed.",
  },
];

export function MissionSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ember)]">
            Our Mission
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl lg:text-5xl">
            Connect. Educate. Mobilize.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ignite Michigan brings together people who care about our state&apos;s
            future — providing a welcoming community for civic learning, engagement,
            and action.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-[var(--navy)]/8 bg-card p-8 shadow-sm transition-all hover:border-[var(--gold)]/30 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy)]/5 text-[var(--navy)] transition-colors group-hover:bg-[var(--gold)]/15 group-hover:text-[var(--ember)]">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--navy)]">{pillar.title}</h3>
                <p className="mt-3 text-muted-foreground">{pillar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
