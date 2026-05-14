import { NextResponse } from "next/server";
import { escapeHtml, sendSupportEmail } from "@/lib/sendSupportEmail";

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const role = readString(o.role);
  const name = readString(o.name);
  const email = readString(o.email);
  const phone = readString(o.phone);
  const expertise = readString(o.expertise);
  const availability = readString(o.availability);
  const portfolio = readString(o.portfolio);
  const message = readString(o.message);

  if (!role || !name || !email || !phone || !expertise || !availability || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const subject = `Partner: ${role} - ${name}`;
  const html = `
    <p><strong>New partnership form submission</strong></p>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Role</strong></td><td>${escapeHtml(role)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Expertise</strong></td><td>${escapeHtml(expertise)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Availability</strong></td><td>${escapeHtml(availability)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Portfolio</strong></td><td>${escapeHtml(portfolio || "-")}</td></tr>
    </table>
    <p style="margin-top:16px;"><strong>Message</strong></p>
    <p style="white-space:pre-wrap;border-left:3px solid #e5c322;padding-left:12px;">${escapeHtml(message)}</p>
  `;

  const result = await sendSupportEmail({ subject, html, replyTo: email });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
