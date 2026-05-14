import { Resend } from "resend";

/** Inbound address for site form notifications. */
const DEFAULT_INBOX = "support@youthplusafrica.com";

/**
 * Env:
 * - RESEND_API_KEY (required) - from https://resend.com/api-keys
 * - CONTACT_INBOX_EMAIL (optional) - defaults to support@youthplusafrica.com
 * - EMAIL_FROM (optional) - overrides default sender. Default: Youth+ Africa <tech@youthplusafrica.com>
 *   (domain must be verified in Resend.)
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendSupportEmail(params: {
  subject: string;
  html: string;
  replyTo: string;
}): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error: "Email is not configured yet. Please email us directly at support@youthplusafrica.com.",
      status: 503,
    };
  }

  const to = (process.env.CONTACT_INBOX_EMAIL ?? DEFAULT_INBOX).trim();
  const from = (process.env.EMAIL_FROM ?? "Youth+ Africa <tech@youthplusafrica.com>").trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo,
    });

    if (error) {
      console.error("[sendSupportEmail] Resend error:", error);
      return {
        ok: false,
        error:
          "We could not deliver your message. Please try again or email support@youthplusafrica.com directly.",
        status: 502,
      };
    }

    return { ok: true };
  } catch (e) {
    console.error("[sendSupportEmail]", e);
    return {
      ok: false,
      error:
        "We could not deliver your message. Please try again or email support@youthplusafrica.com directly.",
      status: 502,
    };
  }
}
