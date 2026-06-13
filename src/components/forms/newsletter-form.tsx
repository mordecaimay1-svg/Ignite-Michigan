"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NewsletterFormProps = {
  variant?: "default" | "footer" | "inline";
  className?: string;
};

export function NewsletterForm({
  variant = "default",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await subscribeNewsletter({ email });
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-2 sm:flex-row",
        variant === "inline" && "sm:max-w-md",
        className
      )}
    >
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={cn(
          variant === "footer" &&
            "border-white/20 bg-white/10 text-white placeholder:text-white/50"
        )}
        aria-label="Email address"
      />
      <Button
        type="submit"
        disabled={pending}
        className={cn(
          "shrink-0",
          variant === "footer"
            ? "bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold)]/90"
            : "bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold)]/90"
        )}
      >
        {pending ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
