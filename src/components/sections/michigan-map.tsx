"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";

const COUNTIES = [
  { id: "wayne", name: "Wayne", active: true },
  { id: "oakland", name: "Oakland", active: true },
  { id: "macomb", name: "Macomb", active: true },
  { id: "kent", name: "Kent", active: true },
  { id: "genesee", name: "Genesee", active: false },
  { id: "washtenaw", name: "Washtenaw", active: true },
  { id: "ingham", name: "Ingham", active: false },
  { id: "ottawa", name: "Ottawa", active: false },
  { id: "kalamazoo", name: "Kalamazoo", active: true },
  { id: "livingston", name: "Livingston", active: false },
];

export function MichiganMapSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeCount = COUNTIES.filter((c) => c.active).length;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
            County Chapters
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            A movement growing across Michigan
          </h2>
          <p className="mt-4 text-muted-foreground">
            {activeCount} counties with active chapters — and expanding. Find
            your county or start a new chapter where you live.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted/30 p-8">
              <svg
                viewBox="0 0 400 500"
                className="h-full w-full"
                aria-label="Michigan counties map"
              >
                <path
                  d="M120 80 L280 60 L320 200 L300 420 L80 450 L60 250 Z"
                  fill="oklch(0.22 0.04 255 / 0.08)"
                  stroke="oklch(0.22 0.04 255)"
                  strokeWidth="2"
                />
                {COUNTIES.map((county, i) => {
                  const x = 100 + (i % 5) * 45;
                  const y = 120 + Math.floor(i / 5) * 70;
                  const isSelected = selected === county.id;
                  return (
                    <g
                      key={county.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(county.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setSelected(county.id)
                      }
                      aria-label={`${county.name} county`}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 14 : 10}
                        fill={
                          county.active
                            ? "oklch(0.72 0.12 85)"
                            : "oklch(0.85 0.02 255)"
                        }
                        stroke={isSelected ? "oklch(0.22 0.04 255)" : "none"}
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />
                      <text
                        x={x}
                        y={y + 28}
                        textAnchor="middle"
                        className="fill-foreground text-[10px] font-medium"
                      >
                        {county.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border bg-card p-8">
              {selected ? (
                <>
                  <h3 className="text-2xl font-bold capitalize">{selected}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {COUNTIES.find((c) => c.id === selected)?.active
                      ? "Active chapter — connect with local leaders and upcoming events."
                      : "No active chapter yet — you could be the one to start it."}
                  </p>
                  <a
                    href="/get-involved"
                    className="mt-6 inline-flex text-sm font-semibold text-[var(--gold)] hover:underline"
                  >
                    Get involved in this county →
                  </a>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">Select a county</h3>
                  <p className="mt-2 text-muted-foreground">
                    Tap a point on the map to see chapter status and next steps.
                  </p>
                  <ul className="mt-6 space-y-2">
                    {COUNTIES.filter((c) => c.active).map((c) => (
                      <li
                        key={c.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                        {c.name} — Active
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
