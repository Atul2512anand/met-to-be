import { verifyRazorpaySignature } from "@/lib/razorpay";
import { getExperience } from "@/lib/events";
import { escapeHtml, sendOwnerAlert, sendToApplicant, shellHtml } from "@/lib/mail";

type VerifyPayload = {
  mode?: unknown;
  reference?: unknown;
  slug?: unknown;
  orderId?: unknown;
  paymentId?: unknown;
  signature?: unknown;
  utr?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: VerifyPayload;

  try {
    payload = (await request.json()) as VerifyPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const mode = asString(payload.mode);
  if (mode === "upi") return handleUpiVerification(payload);

  const reference = asString(payload.reference);
  const slug = asString(payload.slug);
  const orderId = asString(payload.orderId);
  const paymentId = asString(payload.paymentId);
  const signature = asString(payload.signature);
  const name = asString(payload.name);
  const email = asString(payload.email).toLowerCase();
  const phone = asString(payload.phone);

  if (!reference || !slug || !orderId || !paymentId || !signature || !name || !email) {
    return Response.json(
      { ok: false, error: "Missing booking details." },
      { status: 400 }
    );
  }

  const experience = getExperience(slug);
  if (!experience) {
    return Response.json(
      { ok: false, error: "Unknown experience." },
      { status: 404 }
    );
  }

  if (!verifyRazorpaySignature(orderId, paymentId, signature)) {
    console.error("[book] signature mismatch", { reference, orderId, paymentId });
    return Response.json(
      { ok: false, error: "Payment could not be verified. If money was deducted it will auto-refund — please contact us." },
      { status: 400 }
    );
  }

  const priceLine = `₹${experience.price.toLocaleString("en-IN")} paid via Razorpay`;

  const ownerRows = (
    [
      ["Booking", reference],
      ["Experience", `${experience.name} · ${experience.dateLabel} · ${experience.area}`],
      ["Name", name],
      ["Email", email],
      ["Phone", phone || "—"],
      ["Payment", `${paymentId} (${priceLine})`],
    ] as const
  )
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 16px;color:#5c5248;border-bottom:1px solid #f1e9dd;">${escapeHtml(label)}</td><td style="padding:9px 16px;font-weight:600;color:#231c16;border-bottom:1px solid #f1e9dd;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const ownerHtml = `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #e9dfcf;border-radius:14px;overflow:hidden;">
    <div style="background:#c4643e;color:#ffffff;padding:18px 22px;font-size:16px;font-weight:bold;letter-spacing:0.05em;">MET &amp; WED &nbsp;·&nbsp; New Experience Booking</div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${ownerRows}</table>
    <div style="padding:14px 22px;background:#faf5ee;color:#5c5248;font-size:12px;">Reply directly to the guest at ${escapeHtml(email)}.</div>
  </div>`;

  const guestBody = `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;">Your seat is confirmed. Here are your details:</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:18px;">
        <tr><td style="padding:7px 10px;background:#fce9dc;border-radius:8px 0 0 8px;font-weight:600;">Experience</td><td style="padding:7px 10px;background:#fce9dc;border-radius:0 8px 8px 0;">${escapeHtml(experience.name)}</td></tr>
        <tr><td style="padding:7px 10px;">When</td><td style="padding:7px 10px;">${escapeHtml(experience.dateLabel)}</td></tr>
        <tr><td style="padding:7px 10px;">Where</td><td style="padding:7px 10px;">${escapeHtml(experience.area)}, Bengaluru</td></tr>
        <tr><td style="padding:7px 10px;">Booking</td><td style="padding:7px 10px;">${escapeHtml(reference)} · ${priceLine}</td></tr>
      </table>
      <p style="margin:0 0 8px;font-weight:600;">Before you come</p>
      <ul style="margin:0 0 16px;padding-left:20px;color:#5c5248;">
        <li style="margin-bottom:5px;">Exact venue address unlocks after host check-in — watch your inbox.</li>
        <li style="margin-bottom:5px;">Carry a government photo ID matching your verified name.</li>
        <li>Free reschedule/cancellation windows apply as per the experience page.</li>
      </ul>
      <p style="margin:0;color:#5c5248;">Come as you are. The room does the rest.</p>`;

  const [emailed, confirmed] = await Promise.all([
    sendOwnerAlert(`New booking ${reference} — ${experience.name}`, ownerHtml, email),
    sendToApplicant(
      email,
      `Seat confirmed — ${experience.name} (${reference}) | Met & Wed`,
      shellHtml("Seat confirmed", guestBody, "Met & Wed · Maybe You Haven’t Met Them Yet."),
      process.env.NOTIFY_EMAIL ?? undefined
    ),
  ]);

  console.info("[book]", {
    reference,
    slug,
    name,
    email,
    phone,
    paymentId,
    emailed,
    confirmed,
  });

  return Response.json({ ok: true, emailed, confirmed });
}

async function handleUpiVerification(payload: VerifyPayload) {
  const reference = asString(payload.reference);
  const slug = asString(payload.slug);
  const utr = asString(payload.utr);
  const name = asString(payload.name);
  const email = asString(payload.email).toLowerCase();
  const phone = asString(payload.phone);

  if (!reference || !slug || !name || !email) {
    return Response.json(
      { ok: false, error: "Missing booking details." },
      { status: 400 }
    );
  }

  if (!/^\d{12}$/.test(utr)) {
    return Response.json(
      { ok: false, error: "Enter the 12-digit UPI transaction (UTR) number from your payment app." },
      { status: 400 }
    );
  }

  const experience = getExperience(slug);
  if (!experience) {
    return Response.json(
      { ok: false, error: "Unknown experience." },
      { status: 404 }
    );
  }

  const priceLine = `₹${experience.price.toLocaleString("en-IN")} via UPI`;

  const ownerRows = (
    [
      ["Booking", reference],
      ["Experience", `${experience.name} · ${experience.dateLabel} · ${experience.area}`],
      ["Name", name],
      ["Email", email],
      ["Phone", phone || "—"],
      ["UTR", `${utr} — VERIFY IN YOUR UPI APP`],
    ] as const
  )
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 16px;color:#5c5248;border-bottom:1px solid #f1e9dd;">${escapeHtml(label)}</td><td style="padding:9px 16px;font-weight:600;color:#231c16;border-bottom:1px solid #f1e9dd;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const ownerHtml = `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:2px solid #f2a83d;border-radius:14px;overflow:hidden;">
    <div style="background:#b87a17;color:#ffffff;padding:18px 22px;font-size:16px;font-weight:bold;letter-spacing:0.05em;">MET &amp; WED &nbsp;·&nbsp; ACTION NEEDED — UPI Payment to Verify</div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${ownerRows}</table>
    <div style="padding:14px 22px;background:#faf5ee;color:#5c5248;font-size:12px;">Match the UTR in your UPI app, then confirm the seat with the guest at ${escapeHtml(email)}.</div>
  </div>`;

  const guestBody = `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;">We've received your booking for <strong>${escapeHtml(experience.name)}</strong> (${priceLine}) and your UPI reference <strong>${escapeHtml(utr)}</strong>.</p>
      <div style="margin:0 0 18px;padding:14px 18px;background:#fce9dc;border-radius:10px;">Your booking:&nbsp;<strong style="letter-spacing:0.08em;">${escapeHtml(reference)}</strong></div>
      <p style="margin:0 0 16px;">Our team is matching it in our UPI records — you'll get a final confirmation shortly, usually within a few hours. Your seat is held meanwhile.</p>
      <p style="margin:0;color:#5c5248;">Questions? Just reply to this email.</p>`;

  const [emailed, confirmed] = await Promise.all([
    sendOwnerAlert(`VERIFY UPI ${utr} — ${reference} ${experience.name}`, ownerHtml, email),
    sendToApplicant(
      email,
      `Booking received — ${experience.name} (${reference}) | Met & Wed`,
      shellHtml("Booking received", guestBody, "Met & Wed · Maybe You Haven’t Met Them Yet."),
      process.env.NOTIFY_EMAIL ?? undefined
    ),
  ]);

  console.info("[book]", {
    reference,
    slug,
    name,
    email,
    phone,
    utr,
    emailed,
    confirmed,
  });

  return Response.json({ ok: true, emailed, confirmed });
}
