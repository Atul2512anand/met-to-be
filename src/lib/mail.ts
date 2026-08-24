import nodemailer from "nodemailer";
import { Resend } from "resend";
import { site } from "@/lib/site";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function shellHtml(header: string, body: string, footer?: string): string {
  return `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #e9dfcf;border-radius:14px;overflow:hidden;">
    <div style="background:#c4643e;color:#ffffff;padding:20px 22px;">
      <div style="font-size:13px;letter-spacing:0.18em;">MET&nbsp;&amp;&nbsp;WED</div>
      <div style="font-size:19px;font-weight:bold;margin-top:6px;">${header}</div>
    </div>
    <div style="padding:24px 26px;color:#231c16;font-size:14px;line-height:1.7;">${body}</div>
    ${footer ? `<div style="padding:14px 22px;background:#faf5ee;color:#5c5248;font-size:12px;">${footer}</div>` : ""}
  </div>`;
}

export async function sendToApplicant(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER ?? site.owner.gmailUser;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `"Met & Wed" <${gmailUser}>`,
        to,
        replyTo,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error("[mail] applicant via gmail failed", error);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[mail] applicant send skipped — no gmail or resend creds");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Met & Wed <onboarding@resend.dev>",
      to,
      replyTo,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("[mail] applicant via resend failed", error);
    return false;
  }
}

export async function sendOwnerAlert(
  subject: string,
  html: string,
  replyTo?: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL ?? site.owner.notifyEmail;

  if (!apiKey || !notifyTo) {
    console.warn("[mail] owner alert skipped — RESEND_API_KEY or NOTIFY_EMAIL missing");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Met & Wed <onboarding@resend.dev>",
      to: notifyTo,
      replyTo,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("[mail] owner alert failed", error);
    return false;
  }
}
