import { BookOpen, Heart, Network, Vote } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { VISION_GOALS } from "@/lib/constants";

const iconMap = {
  network: Network,
  book: BookOpen,
  vote: Vote,
  heart: Heart,
} as const;

export function VisionGoalsSection() {
  return (
    <section className="relative border-y border-[var(--gold)]/15 bg-[var(--navy)] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,185,66,0.05)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Our Vision for Michigan
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Building something that lasts
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Ignite Michigan exists to connect, educate, and mobilize citizens who
            want to see our state thrive — one community at a time.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VISION_GOALS.map((goal, i) => {
            const Icon = iconMap[goal.icon];
            return (
              <FadeIn key={goal.title} delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col p-6 transition-colors hover:border-[var(--gold)]/25">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gold)]/15">
                    <Icon className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{goal.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                    {goal.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
