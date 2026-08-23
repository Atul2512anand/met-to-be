const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistPayload = {
  name?: unknown;
  email?: unknown;
  city?: unknown;
  timeline?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function makeReference(): string {
  return `MTB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
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

  const reference = makeReference();

  console.info("[waitlist]", {
    reference,
    name,
    email,
    city,
    timeline,
    at: new Date().toISOString(),
  });

  return Response.json({ ok: true, reference });
}
