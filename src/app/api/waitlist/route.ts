import { Resend } from "resend";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistPayload = {
  name?: unknown;
  email?: unknown;
  city?: unknown;
  timeline?: unknown;
};

type Application = {
  reference: string;
  name: string;
  email: string;
  city: string;
  timeline: string;
  at: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function makeReference(): string {
  return `MTB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(app: Application): string {
  const rows = (
    [
      ["Reference", app.reference],
      ["Name", app.name],
      ["Email", app.email],
      ["City", app.city],
      ["Marriage timeline", app.timeline],
      ["Submitted at", app.at],
    ] as const
  )
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 16px;color:#5c5248;border-bottom:1px solid #f1e9dd;">${escapeHtml(label)}</td><td style="padding:9px 16px;font-weight:600;color:#231c16;border-bottom:1px solid #f1e9dd;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #e9dfcf;border-radius:14px;overflow:hidden;">
    <div style="background:#c4643e;color:#ffffff;padding:18px 22px;font-size:16px;font-weight:bold;letter-spacing:0.05em;">MET TO BE &nbsp;·&nbsp; New Founding 100 Application</div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
    <div style="padding:14px 22px;background:#faf5ee;color:#5c5248;font-size:12px;">You can reply directly to this applicant at ${escapeHtml(app.email)}.</div>
  </div>`;
}

async function notifyByEmail(app: Application): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL;

  if (!apiKey || !notifyTo) {
    console.warn("[waitlist] email skipped — RESEND_API_KEY or NOTIFY_EMAIL missing");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Met To Be <onboarding@resend.dev>",
      to: notifyTo,
      replyTo: app.email,
      subject: `New application ${app.reference} — ${app.name} (${app.city})`,
      html: buildEmailHtml(app),
    });
    return true;
  } catch (error) {
    console.error("[waitlist] email failed", error);
    return false;
  }
}

async function notifyBySheet(app: Application): Promise<boolean> {
  const url = process.env.SHEET_WEBHOOK_URL;

  if (!url) {
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.SHEET_SECRET ?? "", ...app }),
    });
    return res.ok;
  } catch (error) {
    console.error("[waitlist] sheet append failed", error);
    return false;
  }
}

function buildConfirmationHtml(app: Application): string {
  return `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #e9dfcf;border-radius:14px;overflow:hidden;">
    <div style="background:#c4643e;color:#ffffff;padding:20px 22px;">
      <div style="font-size:13px;letter-spacing:0.18em;">MET&nbsp;TO&nbsp;BE</div>
      <div style="font-size:19px;font-weight:bold;margin-top:6px;">Application received</div>
    </div>
    <div style="padding:24px 26px;color:#231c16;font-size:14px;line-height:1.7;">
      <p style="margin:0 0 12px;">Hi ${escapeHtml(app.name)},</p>
      <p style="margin:0 0 16px;">Thank you for applying to the Founding 100 in ${escapeHtml(app.city)}. Your application is now with our review team.</p>
      <div style="margin:0 0 18px;padding:14px 18px;background:#fce9dc;border-radius:10px;">Your reference:&nbsp;<strong style="letter-spacing:0.08em;">${escapeHtml(app.reference)}</strong></div>
      <p style="margin:0 0 8px;font-weight:600;">What happens next</p>
      <ol style="margin:0 0 16px;padding-left:20px;color:#5c5248;">
        <li style="margin-bottom:6px;">A human reviews your application within 48 hours.</li>
        <li style="margin-bottom:6px;">Accepted applicants receive identity verification steps.</li>
        <li>Founding 100 onboarding, then invitations to the first curated events.</li>
      </ol>
      <p style="margin:0;color:#5c5248;">Applications are read by people, not scored by software. Not everyone is admitted — that is what keeps the room worth being in.</p>
    </div>
    <div style="padding:14px 22px;background:#faf5ee;color:#5c5248;font-size:12px;">Met To Be &nbsp;·&nbsp; Meet. Connect. Choose.</div>
  </div>`;
}

async function sendConfirmation(app: Application): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `"Met To Be" <${gmailUser}>`,
        to: app.email,
        replyTo: process.env.NOTIFY_EMAIL ?? undefined,
        subject: `Application received — ${app.reference} | Met To Be`,
        html: buildConfirmationHtml(app),
      });
      return true;
    } catch (error) {
      console.error("[waitlist] gmail confirmation failed", error);
      return false;
    }
  }

  console.warn(
    "[waitlist] confirmation via gmail skipped — falling back to resend"
  );

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[waitlist] confirmation skipped — RESEND_API_KEY missing");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Met To Be <onboarding@resend.dev>",
      to: app.email,
      replyTo: process.env.NOTIFY_EMAIL ?? undefined,
      subject: `Application received — ${app.reference} | Met To Be`,
      html: buildConfirmationHtml(app),
    });
    return true;
  } catch (error) {
    console.error("[waitlist] confirmation failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  let payload: WaitlistPayload;

  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = asString(payload.name);
  const email = asString(payload.email).toLowerCase();
  const city = asString(payload.city);
  const timeline = asString(payload.timeline);

  if (!name || name.length < 2) {
    return Response.json(
      { ok: false, error: "Please share your first name." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email) || email.length > 120) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!city) {
    return Response.json(
      { ok: false, error: "Please select your city." },
      { status: 400 }
    );
  }

  if (!timeline || timeline.length > 80) {
    return Response.json(
      { ok: false, error: "Please choose your marriage timeline." },
      { status: 400 }
    );
  }

  const app: Application = {
    reference: makeReference(),
    name,
    email,
    city,
    timeline,
    at: new Date().toISOString(),
  };

  const [emailed, savedToSheet, confirmed] = await Promise.all([
    notifyByEmail(app),
    notifyBySheet(app),
    sendConfirmation(app),
  ]);

  console.info(
    "[waitlist]",
    app,
    `emailed=${emailed}`,
    `sheet=${savedToSheet}`,
    `confirmed=${confirmed}`
  );

  return Response.json({
    ok: true,
    reference: app.reference,
    emailed,
    savedToSheet,
    confirmed,
  });
}
