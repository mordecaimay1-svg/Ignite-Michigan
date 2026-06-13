import Image from "next/image";
import { FOUNDER } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FounderProfileCardProps = {
  className?: string;
  showCaption?: boolean;
  imageClassName?: string;
};

export function FounderProfileCard({
  className,
  showCaption = true,
  imageClassName,
}: FounderProfileCardProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-card shadow-xl", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--navy)]">
        <Image
          src={FOUNDER.image}
          alt={`${FOUNDER.name}, ${FOUNDER.title}`}
          fill
          className={cn("object-cover object-top", imageClassName)}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      {showCaption && (
        <div className="border-t border-[var(--navy)]/8 bg-card px-6 py-5 text-center sm:text-left">
          <p className="text-lg font-semibold text-[var(--navy)]">{FOUNDER.name}</p>
          <p className="mt-0.5 text-sm font-medium text-[var(--ember)]">{FOUNDER.title}</p>
        </div>
      )}
    </div>
  );
}
