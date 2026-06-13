import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) {
    return { ok: true, skipped: true as const };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const { data, error } = await resend.emails.send({ from, to, subject, html });

  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, id: data?.id };
}
