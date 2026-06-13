"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type JoinFormProps = {
  className?: string;
};

export function JoinForm({ className }: JoinFormProps) {
  const [pending, startTransition] = useTransition();
  const [volunteerInterest, setVolunteerInterest] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const form = e.currentTarget;

    if (!volunteerInterest) {
      toast.error("Please select volunteer interest.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: fd.get("firstName"),
            lastName: fd.get("lastName"),
            email: fd.get("email"),
            phone: fd.get("phone") || undefined,
            city: fd.get("city") || undefined,
            volunteerInterest,
          }),
        });

        const result = (await res.json()) as { success: boolean; message: string };

        if (result.success) {
          toast.success(result.message);
          form.reset();
          setVolunteerInterest("");
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-4"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="join-firstName">First name</Label>
          <Input id="join-firstName" name="firstName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="join-lastName">Last name</Label>
          <Input id="join-lastName" name="lastName" required className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="join-email">Email</Label>
        <Input
          id="join-email"
          name="email"
          type="email"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="join-phone">Phone number (optional)</Label>
        <Input id="join-phone" name="phone" type="tel" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="join-city">City (optional)</Label>
        <Input id="join-city" name="city" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="join-volunteerInterest">Volunteer interest</Label>
        <Select
          value={volunteerInterest}
          onValueChange={(v) => setVolunteerInterest(v ?? "")}
          required
        >
          <SelectTrigger id="join-volunteerInterest" className="mt-1">
            <SelectValue placeholder="Select Yes or No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-[var(--gold)] text-[var(--navy)]"
      >
        {pending ? "Submitting…" : "Join Ignite Michigan"}
      </Button>
    </form>
  );
}
