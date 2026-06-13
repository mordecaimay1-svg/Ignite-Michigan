import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  firstName: z.string().min(1).max(80).optional(),
  county: z.string().max(80).optional(),
});

export const volunteerSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(80),
  lastName: z.string().min(1, "Last name is required").max(80),
  email: z.string().email(),
  phone: z.string().min(10).max(20).optional(),
  county: z.string().min(1, "County is required").max(80),
  type: z.enum([
    "general",
    "leadership",
    "prayer",
    "county_rep",
  ]),
  message: z.string().max(2000).optional(),
});

export const eventRsvpSchema = z.object({
  eventId: z.string().uuid(),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
});

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const authSignupSchema = authLoginSchema.extend({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  county: z.string().max(80).optional(),
  referralCode: z.string().max(32).optional(),
});

export const prayerRequestSchema = z.object({
  request: z.string().min(10).max(2000),
  isAnonymous: z.boolean().default(false),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type EventRsvpInput = z.infer<typeof eventRsvpSchema>;
export type AuthLoginInput = z.infer<typeof authLoginSchema>;
export type AuthSignupInput = z.infer<typeof authSignupSchema>;
