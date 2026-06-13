"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-hero-gradient">
      {/* Atmospheric layers */}
      <div className="absolute inset-0 bg-hero-atmosphere" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            rgba(255,255,255,0.03) 48px,
            rgba(255,255,255,0.03) 49px
          )`,
        }}
      />
      {/* Subtle gold glow behind logo area */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ember)] opacity-[0.07] blur-[100px]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo
            size="hero"
            href={false}
            priority
            className="mx-auto mb-10 h-32 w-auto max-w-[280px] sm:h-40 sm:max-w-[320px] md:h-44 md:max-w-[360px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--gold)]" />
            A growing movement across Michigan
          </p>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Awaken Michigan.
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gradient-gold sm:text-3xl md:text-4xl">
            Faith. Freedom. Action.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {SITE.tagline} A welcoming community for civic engagement, education,
            and connection across our state.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="btn-movement h-13 px-10 text-base">
              <Link href="/auth/signup">
                Join the Movement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-movement-outline h-13 px-10 text-base">
              <Link href="/events">
                <Calendar className="mr-2 h-4 w-4" />
                Attend an Event
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/25 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-2 w-1 rounded-full bg-[var(--gold)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
