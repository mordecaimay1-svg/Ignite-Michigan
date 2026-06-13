"use client";

import { useTransition } from "react";
import Link from "next/link";
import { signIn, signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type AuthFormProps = {
  mode: "login" | "signup";
  defaultReferralCode?: string;
};

export function AuthForm({ mode, defaultReferralCode }: AuthFormProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const input = {
        email: fd.get("email") as string,
        password: fd.get("password") as string,
        firstName: (fd.get("firstName") as string) || "",
        lastName: (fd.get("lastName") as string) || "",
        county: (fd.get("county") as string) || undefined,
        referralCode: (fd.get("referralCode") as string) || undefined,
      };

      const result =
        mode === "login"
          ? await signIn(input)
          : await signUp(input);

      if (!result.success) toast.error(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" required className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="county">County (optional)</Label>
            <Input id="county" name="county" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="referralCode">Referral code (optional)</Label>
            <Input
              id="referralCode"
              name="referralCode"
              className="mt-1"
              defaultValue={defaultReferralCode}
            />
          </div>
        </>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1"
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-[var(--gold)] text-[var(--navy)]"
      >
        {pending
          ? "Please wait…"
          : mode === "login"
            ? "Sign In"
            : "Create Account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            No account?{" "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already a member?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
