import { z } from "zod";

/** Join Ignite Michigan form — validated server-side before HubSpot CRM sync. */
export const joinIgniteSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(80),
  lastName: z.string().min(1, "Last name is required").max(80),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(20).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  volunteerInterest: z.enum(["yes", "no"], {
    message: "Please select volunteer interest",
  }),
});

export type JoinIgniteInput = z.infer<typeof joinIgniteSchema>;
