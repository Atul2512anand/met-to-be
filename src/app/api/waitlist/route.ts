import { escapeHtml, sendOwnerAlert, sendToApplicant, shellHtml } from "@/lib/mail";

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

function buildEmailHtml(app: Application): string {
  const isWaitlist = app.timeline.startsWith("City waitlist");
  const rows = (
    [
      ["Reference", app.reference],
      ["Name", app.name],
      ["Email", app.email],
      ["City", app.city],
      [isWaitlist ? "Type" : "Marriage timeline", app.timeline.replace("City waitlist — ", "")],
      ["Submitted at", app.at],
    ] as const
  )
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 16px;color:#5c5248;border-bottom:1px solid #f1e9dd;">${escapeHtml(label)}</td><td style="padding:9px 16px;font-weight:600;color:#231c16;border-bottom:1px solid #f1e9dd;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const header = isWaitlist ? "New City Waitlist" : "New Membership Application";

  return `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #e9dfcf;border-radius:14px;overflow:hidden;">
    <div style="background:#c4643e;color:#ffffff;padding:18px 22px;font-size:16px;font-weight:bold;letter-spacing:0.05em;">MET &amp; WED &nbsp;·&nbsp; ${header}</div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
    <div style="padding:14px 22px;background:#faf5ee;color:#5c5248;font-size:12px;">You can reply directly to this person at ${escapeHtml(app.email)}.</div>
  </div>`;
}

function buildConfirmationHtml(app: Application): string {
  const isWaitlist = app.timeline.startsWith("City waitlist");
  const intro = isWaitlist
    ? `Thank you for joining the ${escapeHtml(app.city)} waitlist. You’ll be among the first we invite when doors open there.`
    : `Thank you for applying to Met &amp; Wed in ${escapeHtml(app.city)}. Your application is now with our review team.`;
  const steps = isWaitlist
    ? `<li style="margin-bottom:6px;">We review interest city by city — density first.</li>
        <li style="margin-bottom:6px;">You get first access to founding memberships in ${escapeHtml(app.city)}.</li>
        <li>Meanwhile, feel free to explore what’s live in Bengaluru.</li>`
    : `<li style="margin-bottom:6px;">A human reviews your application within 48 hours.</li>
        <li style="margin-bottom:6px;">Accepted applicants receive identity verification steps.</li>
        <li>Choose the Met &amp; Wed Pass, then book your first curated experience.</li>`;

  const body = `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(app.name)},</p>
      <p style="margin:0 0 16px;">${intro}</p>
      <div style="margin:0 0 18px;padding:14px 18px;background:#fce9dc;border-radius:10px;">Your reference:&nbsp;<strong style="letter-spacing:0.08em;">${escapeHtml(app.reference)}</strong></div>
      <p style="margin:0 0 8px;font-weight:600;">What happens next</p>
      <ol style="margin:0 0 16px;padding-left:20px;color:#5c5248;">
        ${steps}
      </ol>
      <p style="margin:0;color:#5c5248;">Applications are read by people, not scored by software.</p>`;

  return shellHtml(
    isWaitlist ? "You’re on the list" : "Application received",
    body,
    "Met & Wed · Maybe You Haven’t Met Them Yet."
  );
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

  const isWaitlist = timeline.startsWith("City waitlist");

  const ownerSubject = isWaitlist
    ? `New ${app.city} waitlist signup ${app.reference} — ${app.name}`
    : `New application ${app.reference} — ${app.name} (${app.city})`;

  const applicantSubject = isWaitlist
    ? `You’re on the ${app.city} waitlist — ${app.reference} | Met & Wed`
    : `Application received — ${app.reference} | Met & Wed`;

  const [emailed, confirmed] = await Promise.all([
    sendOwnerAlert(ownerSubject, buildEmailHtml(app), app.email),
    sendToApplicant(
      app.email,
      applicantSubject,
      buildConfirmationHtml(app),
      process.env.NOTIFY_EMAIL ?? undefined
    ),
  ]);

  console.info("[waitlist]", app, `emailed=${emailed}`, `confirmed=${confirmed}`);

  return Response.json({
    ok: true,
    reference: app.reference,
    emailed,
    confirmed,
  });
}
