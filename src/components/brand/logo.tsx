import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LOGO, SITE } from "@/lib/constants";

const sizeMap = {
  xs: { width: 36, height: 36, className: "h-9 w-9" },
  sm: { width: 48, height: 48, className: "h-12 w-12" },
  md: { width: 56, height: 56, className: "h-14 w-14" },
  nav: { width: 72, height: 72, className: "h-14 w-auto sm:h-[4.25rem]" },
  lg: { width: 80, height: 80, className: "h-20 w-20" },
  xl: { width: 120, height: 120, className: "h-28 w-28" },
  hero: { width: 320, height: 320, className: "h-32 w-auto sm:h-40 md:h-44" },
} as const;

type LogoSize = keyof typeof sizeMap;

type LogoProps = {
  size?: LogoSize;
  className?: string;
  href?: string | false;
  priority?: boolean;
};

export function Logo({
  size = "md",
  className,
  href = "/",
  priority = false,
}: LogoProps) {
  const { width, height, className: sizeClass } = sizeMap[size];

  const image = (
    <Image
      src={LOGO.path}
      alt={SITE.name}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn(
        "h-auto w-auto max-w-full object-contain",
        "drop-shadow-[0_4px_24px_rgba(255,100,0,0.35)]",
        sizeClass,
        className
      )}
      style={{ background: "transparent" }}
    />
  );

  if (href === false) {
    return (
      <span className="inline-flex shrink-0 items-center justify-center bg-transparent">
        {image}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center justify-center bg-transparent transition-opacity hover:opacity-90"
      aria-label={`${SITE.name} home`}
    >
      {image}
    </Link>
  );
}
