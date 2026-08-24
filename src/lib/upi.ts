import { site } from "@/lib/site";

export type UpiIntent = {
  vpa: string;
  payeeName: string;
  amount: number;
  note: string;
};

export function buildUpiUri({
  vpa,
  payeeName,
  amount,
  note,
}: UpiIntent): string {
  const params = new URLSearchParams({
    pa: vpa,
    pn: payeeName,
    am: String(amount),
    cu: "INR",
    tn: note.slice(0, 40),
  });
  return `upi://pay?${params.toString()}`;
}

export function upiConfigured(): boolean {
  return Boolean(process.env.OWNER_UPI_ID ?? site.owner.upiId);
}

export function ownerUpiId(): string {
  return process.env.OWNER_UPI_ID ?? site.owner.upiId;
}

export function ownerUpiName(): string {
  return process.env.OWNER_UPI_NAME ?? site.owner.upiName;
}
