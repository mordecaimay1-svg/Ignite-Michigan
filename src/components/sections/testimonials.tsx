"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

const TESTIMONIALS = [
  {
    quote:
      "For the first time, our congregation has a clear path to civic engagement that honors Christ and builds real community.",
    author: "Pastor David R.",
    role: "Grand Rapids",
  },
  {
    quote:
      "Ignite Michigan gave our church a clear path to civic engagement — real community, real action, real hope.",
    author: "Sarah M.",
    role: "Oakland County",
  },
  {
    quote:
      "Ignite Michigan is what Michigan needed — bold, faithful, and organized for the long haul.",
    author: "James & Linda K.",
    role: "Macomb County",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <FadeIn>
          <Quote className="mx-auto h-10 w-10 text-[var(--gold)]" />
          <div className="relative mt-8 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="text-xl font-medium leading-relaxed sm:text-2xl"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <p className="mt-6 font-semibold">{current.author}</p>
          <p className="text-sm text-muted-foreground">{current.role}</p>
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
