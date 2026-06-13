import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

type CtaBlockProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
  dark?: boolean;
};

export function CtaBlock({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
  dark = true,
}: CtaBlockProps) {
  return (
    <section
      className={cn(
        "section-padding",
        dark ? "bg-hero-gradient text-white" : "bg-muted",
        className
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p
            className={cn(
              "mt-4 text-lg",
              dark ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className={cn("btn-movement px-8", !dark && "shadow-md")}
            >
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            {secondaryHref && secondaryLabel && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={
                  dark
                    ? "border-white/30 text-white hover:bg-white/10"
                    : undefined
                }
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
