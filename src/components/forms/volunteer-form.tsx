"use client";

import { useTransition } from "react";
import { submitVolunteerApplication } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { VolunteerType } from "@/types/database";

type VolunteerFormProps = {
  defaultType?: VolunteerType;
};

export function VolunteerForm({ defaultType = "general" }: VolunteerFormProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitVolunteerApplication({
        firstName: fd.get("firstName") as string,
        lastName: fd.get("lastName") as string,
        email: fd.get("email") as string,
        phone: (fd.get("phone") as string) || undefined,
        county: fd.get("county") as string,
        type: fd.get("type") as VolunteerType,
        message: (fd.get("message") as string) || undefined,
      });
      if (result.success) {
        toast.success(result.message);
        e.currentTarget.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="type" id="type-hidden" defaultValue={defaultType} />
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
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="county">County</Label>
        <Input id="county" name="county" required className="mt-1" />
      </div>
      <div>
        <Label>How do you want to serve?</Label>
        <Select
          name="type"
          defaultValue={defaultType}
          onValueChange={(v) => {
            if (!v) return;
            const el = document.getElementById("type-hidden") as HTMLInputElement;
            if (el) el.value = v;
          }}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Volunteer</SelectItem>
            <SelectItem value="leadership">Leadership Interest</SelectItem>
            <SelectItem value="prayer">Prayer Team</SelectItem>
            <SelectItem value="county_rep">County Representative</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea id="message" name="message" rows={4} className="mt-1" />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-[var(--gold)] text-[var(--navy)]"
      >
        {pending ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}
