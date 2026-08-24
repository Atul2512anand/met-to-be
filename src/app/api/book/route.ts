import { createRazorpayOrder, razorpayConfigured } from "@/lib/razorpay";
import { ownerUpiId, ownerUpiName, upiConfigured } from "@/lib/upi";
import { getExperience } from "@/lib/events";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s]{6,15}$/;

type BookingPayload = {
  slug?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function makeBookingReference(): string {
  return `MTB-EV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const slug = asString(payload.slug);
  const experience = getExperience(slug);

  if (!experience) {
    return Response.json(
      { ok: false, error: "That experience could not be found." },
      { status: 404 }
    );
  }

  if (experience.spotsLeft <= 0) {
    return Response.json(
      { ok: false, error: "This experience is fully booked — join the waitlist instead!" },
      { status: 409 }
    );
  }

  const name = asString(payload.name);
  const email = asString(payload.email).toLowerCase();
  const phone = asString(payload.phone);

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

  if (phone && !PHONE_RE.test(phone)) {
    return Response.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }

  const reference = makeBookingReference();

  if (razorpayConfigured()) {
    try {
      const order = await createRazorpayOrder({
        amountPaise: experience.price * 100,
        receipt: reference,
        notes: { name, email, phone, slug, experience: experience.name },
      });

      if (!order?.id) {
        return Response.json(
          { ok: false, error: "Payment gateway hiccup. Please try again in a moment." },
          { status: 502 }
        );
      }

      return Response.json({
        ok: true,
        reference,
        mode: "razorpay" as const,
        orderId: order.id,
        amount: experience.price,
        keyId: process.env.RAZORPAY_KEY_ID,
        experienceName: experience.name,
        prefill: { name, email, phone },
      });
    } catch (error) {
      console.error("[book] gateway error", error);
      return Response.json(
        { ok: false, error: "Payment gateway unreachable. Please try again." },
        { status: 502 }
      );
    }
  }

  if (upiConfigured()) {
    console.info("[book]", { reference, slug, name, email }, "upi mode");
    return Response.json({
      ok: true,
      reference,
      mode: "upi" as const,
      amount: experience.price,
      vpa: ownerUpiId(),
      payeeName: ownerUpiName(),
      note: `${experience.name} ${reference}`,
    });
  }

  console.warn("[book]", { reference, slug, name, email, phone }, "manual mode");
  return Response.json({
    ok: true,
    reference,
    mode: "manual" as const,
    amount: experience.price,
  });
}
