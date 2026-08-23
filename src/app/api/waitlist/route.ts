import { Resend } from "resend";

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

  const [emailed, savedToSheet] = await Promise.all([
    notifyByEmail(app),
    notifyBySheet(app),
  ]);

  console.info("[waitlist]", app, `emailed=${emailed}`, `sheet=${savedToSheet}`);

  return Response.json({
    ok: true,
    reference: app.reference,
    emailed,
    savedToSheet,
  });
}
