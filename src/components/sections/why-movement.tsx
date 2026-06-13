import { FadeIn } from "@/components/motion/fade-in";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Michigan's families and communities deserve bold, principled leadership",
  "People of faith have a duty to engage — not retreat from — civic life",
  "Real change happens when ordinary citizens organize and take action",
  "Our state can be restored when courage meets conviction",
  "This movement is growing — and you belong in it",
];

export function WhyMovementSection() {
  return (
    <section className="section-padding border-y border-[var(--navy)]/8 bg-secondary/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ember)]">
              Why This Matters
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
              America is worth fighting for. Michigan can be restored.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Culture, policy, and the future of our state are being decided now.
              Ignite Michigan equips citizens and churches to show up with clarity,
              unity, and unwavering faith.
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <ul className="space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <span className="text-[var(--navy)]/85">{reason}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
