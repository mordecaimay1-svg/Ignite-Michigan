import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { FOOTER_LINKS, SITE } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/10 bg-[var(--navy)] text-white">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Logo
              size="lg"
              href="/"
              className="h-16 w-auto max-w-[220px] sm:h-20 sm:max-w-[260px]"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline"
            >
              <Mail className="h-4 w-4" />
              {SITE.email}
            </a>
          </div>
          <div className="glass-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Stay in the fight</h3>
            <p className="mt-1 text-sm text-white/65">
              Get movement updates, event invites, and action alerts.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Movement
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.movement.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.resources.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />
        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
