"use client";

import { useEffect, useState } from "react";
import { CreditCard, Copy, Lock, Smartphone } from "lucide-react";
import { buildUpiUri } from "@/lib/upi";
import QrImage from "./QrImage";

type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact?: string };
  theme: { color: string };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

const inputClass =
  "w-full rounded-full border border-ink/15 bg-white px-6 py-3.5 text-base text-ink placeholder:text-mocha/60 focus:border-clay focus:outline-none transition-colors";

type Props = {
  slug: string;
  experienceName: string;
  price: number;
  spotsLeft: number;
};

type Stage =
  | { kind: "form" }
  | { kind: "processing" }
  | { kind: "upi"; reference: string; vpa: string; payeeName: string }
  | { kind: "pending"; reference: string }
  | { kind: "done"; reference: string; paid: boolean }
  | { kind: "error"; message: string };

export default function BookingForm({ slug, experienceName, price, spotsLeft }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<Stage>({ kind: "form" });
  const [error, setError] = useState("");
  const [utr, setUtr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [stage.kind]);

  function loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    setStage({ kind: "processing" });

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStage({ kind: "form" });
        return;
      }

      const reference = data.reference as string;

      if (data.mode === "upi") {
        setStage({
          kind: "upi",
          reference,
          vpa: data.vpa as string,
          payeeName: data.payeeName as string,
        });
        return;
      }

      if (data.mode === "manual") {
        setStage({ kind: "done", reference, paid: false });
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        setError("Could not load the payment window. Please check your connection.");
        setStage({ kind: "form" });
        return;
      }

      const checkout = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount * 100,
        name: "Met & Wed",
        description: experienceName,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() },
        theme: { color: "#C4643E" },
        handler: async (response) => {
          const verifyRes = await fetch("/api/book/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference,
              slug,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              name: name.trim(),
              email: email.trim().toLowerCase(),
              phone: phone.trim(),
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.ok) {
            setStage({ kind: "done", reference, paid: true });
          } else {
            setStage({
              kind: "error",
              message:
                verifyData.error ??
                "Payment verification failed. If money was deducted it will auto-refund.",
            });
          }
        },
      });

      checkout.open();
    } catch {
      setError("Network error. Please try again.");
      setStage({ kind: "form" });
    }
  }

  if (stage.kind === "upi") {
    const upiUri = buildUpiUri({
      vpa: stage.vpa,
      payeeName: stage.payeeName,
      amount: price,
      note: `${experienceName} ${stage.reference}`,
    });

    return (
      <div>
        <p className="text-center text-sm text-mocha">
          Pay{" "}
          <strong className="font-display text-ink">₹{price.toLocaleString("en-IN")}</strong>{" "}
          to confirm your seat
        </p>

        <div className="mx-auto mt-5 w-fit rounded-2xl border border-ink/10 bg-white p-4">
          <QrImage uri={upiUri} />
          <p className="mt-2 text-center text-xs text-mocha">
            Scan with any UPI app
          </p>
        </div>

        <a href={upiUri} className="btn btn-outline mt-4 w-full !border-clay/40">
          <Smartphone size={16} /> Open UPI app on this phone
        </a>

        <div className="mt-4 rounded-xl bg-sand px-5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-mocha">
            Or pay to this UPI ID
          </p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <code className="break-all text-sm font-semibold">{stage.vpa}</code>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(stage.vpa);
                  setCopied(true);
                } catch {}
              }}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-clay/40 px-3 py-1.5 text-xs font-medium text-clay transition-colors hover:bg-peach-soft"
            >
              <Copy size={12} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-mocha">
            Amount is pre-filled — pay exactly ₹{price.toLocaleString("en-IN")} to {stage.payeeName}.
          </p>
        </div>

        <form onSubmit={submitUtr} className="mt-5 grid gap-3">
          <input
            aria-label="UPI transaction reference (UTR)"
            inputMode="numeric"
            pattern="\d{12}"
            title="12-digit UPI transaction number"
            required
            maxLength={12}
            value={utr}
            onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 12-digit UTR from your payment app"
            className={`${inputClass} tracking-widest`}
          />
          <button type="submit" className="btn btn-solid w-full">
            I’ve paid — submit reference
          </button>
        </form>

        <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-mocha">
          <Lock size={12} className="mt-0.5 shrink-0" />
          Your seat is held while we verify the reference against our UPI records.
        </p>
      </div>
    );
  }

  if (stage.kind === "pending") {
    return (
      <div className="text-center">
        <p className="font-display text-lg font-semibold text-clay">{stage.reference}</p>
        <h2 className="font-display mt-3 text-2xl font-medium">Booking received!</h2>
        <p className="mt-3 text-sm leading-relaxed text-mocha">
          We’re matching your UPI reference now — you’ll get a final confirmation
          at <strong>{email}</strong>, usually within a few hours. Your seat for{" "}
          {experienceName} is held meanwhile.
        </p>
      </div>
    );
  }

  async function submitUtr(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStage({ kind: "processing" });
    const current = stage as Extract<Stage, { kind: "upi" }>;
    try {
      const res = await fetch("/api/book/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "upi",
          reference: current.reference,
          slug,
          utr: utr.trim(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStage({ kind: "pending", reference: current.reference });
      } else {
        setError(data.error ?? "Could not submit the reference. Please try again.");
        setStage({ kind: "upi", reference: current.reference, vpa: current.vpa, payeeName: current.payeeName });
      }
    } catch {
      setError("Network error. Please try again.");
      setStage({ kind: "upi", reference: current.reference, vpa: current.vpa, payeeName: current.payeeName });
    }
  }

  if (stage.kind === "done") {
    return (
      <div className="text-center">
        <p className="font-display text-lg font-semibold text-clay">{stage.reference}</p>
        <h2 className="font-display mt-3 text-2xl font-medium">
          {stage.paid ? "Seat confirmed!" : "Booking received!"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mocha">
          {stage.paid
            ? `${experienceName} is yours — ₹${price.toLocaleString("en-IN")} paid. A confirmation with venue details is on its way to ${email}.`
            : `We've noted your interest for ${experienceName}. Our team will reach out at ${email} within 48 hours to complete your seat.`}
        </p>
        {!stage.paid ? (
          <p className="mt-4 rounded-xl bg-butter-soft px-5 py-3 text-xs leading-relaxed text-marigold-deep">
            Online payments are being switched on right now — you're seeing our
            manual mode. Nothing to pay today.
          </p>
        ) : null}
      </div>
    );
  }

  if (stage.kind === "error") {
    return (
      <div className="py-6 text-center">
        <p className="text-sm font-medium text-rose-deep">{stage.message}</p>
        <button type="button" onClick={() => setStage({ kind: "form" })} className="btn btn-solid mt-6">
          Back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {error ? (
        <p className="rounded-xl bg-blossom-soft px-5 py-3 text-sm font-medium text-rose-deep">
          {error}
        </p>
      ) : null}

      <input
        aria-label="First name"
        placeholder="First name"
        required
        maxLength={60}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        aria-label="Email address"
        type="email"
        required
        maxLength={120}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={inputClass}
      />
      <input
        aria-label="Phone (optional)"
        type="tel"
        maxLength={15}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        className={inputClass}
      />

      <div className="flex items-center justify-between rounded-2xl bg-sand px-6 py-4">
        <span className="text-sm font-medium text-mocha">
          {spotsLeft <= 5 ? `Only ${spotsLeft} seats left` : `${spotsLeft} seats available`}
        </span>
        <span className="font-display text-2xl font-semibold">
          ₹{price.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        type="submit"
        disabled={stage.kind === "processing"}
        className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {stage.kind === "processing" ? (
          "Processing…"
        ) : (
          <>
            <CreditCard size={17} /> Reserve &amp; pay ₹{price.toLocaleString("en-IN")}
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-mocha">
        <Lock size={12} /> Secured by Razorpay · UPI, cards & netbanking · Free cancellation windows apply
      </p>
    </form>
  );
}
