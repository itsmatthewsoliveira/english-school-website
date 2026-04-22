import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * On-site booking receiver.
 *
 * Writes to Vercel logs always (so no lead is ever lost), and — if
 * RESEND_API_KEY is set — emails Teacher Josi with the details.
 *
 * Set up email delivery later by:
 *   1. Sign up at https://resend.com (free tier ok)
 *   2. Get an API key
 *   3. `vercel env add RESEND_API_KEY production`
 *   4. Optionally `vercel env add BOOKING_FROM_EMAIL` and
 *      `vercel env add BOOKING_TO_EMAIL` — defaults below.
 */

type BookingPayload = {
  name: string;
  email: string;
  whatsapp?: string;
  classType: "trial" | "individual" | "group";
  level?: string;
  goals?: string;
  preferredTimes?: string;
  lang?: "en" | "pt";
};

const TEACHER_EMAIL = process.env.BOOKING_TO_EMAIL || "josi.rodrigues.rjg@gmail.com";
const FROM_EMAIL = process.env.BOOKING_FROM_EMAIL || "The Way English School <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  let body: Partial<BookingPayload>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Validate minimally
  const name = (body.name ?? "").toString().trim().slice(0, 120);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const whatsapp = (body.whatsapp ?? "").toString().trim().slice(0, 60);
  const classType = body.classType;
  const level = (body.level ?? "").toString().trim().slice(0, 40);
  const goals = (body.goals ?? "").toString().trim().slice(0, 800);
  const preferredTimes = (body.preferredTimes ?? "").toString().trim().slice(0, 300);
  const lang: "en" | "pt" = body.lang === "pt" ? "pt" : "en";

  if (!name || !email) {
    return json({ ok: false, error: "name and email are required" }, 400);
  }
  if (!isEmail(email)) {
    return json({ ok: false, error: "invalid email" }, 400);
  }
  if (classType !== "trial" && classType !== "individual" && classType !== "group") {
    return json({ ok: false, error: "invalid classType" }, 400);
  }

  // ALWAYS log — Vercel captures this in function logs, so no lead ever
  // disappears even if Resend is misconfigured.
  console.log(
    "[booking]",
    JSON.stringify({ name, email, whatsapp, classType, level, goals, preferredTimes, lang, at: new Date().toISOString() })
  );

  // Try to email Teacher Josi if Resend is configured.
  const resendKey = process.env.RESEND_API_KEY;
  let emailed = false;
  if (resendKey) {
    try {
      const subject = `New booking: ${classType.toUpperCase()} — ${name}`;
      const html = renderEmail({ name, email, whatsapp, classType, level, goals, preferredTimes, lang });
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TEACHER_EMAIL],
          reply_to: email,
          subject,
          html,
        }),
      });
      emailed = resp.ok;
      if (!resp.ok) {
        const t = await resp.text().catch(() => "");
        console.error("[booking] resend error:", resp.status, t);
      }
    } catch (err) {
      console.error("[booking] email send failed:", err);
    }
  }

  return json({ ok: true, emailed });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmail(p: Required<Omit<BookingPayload, "level" | "goals" | "preferredTimes" | "whatsapp" | "lang">> & BookingPayload) {
  const row = (k: string, v: string) =>
    v ? `<tr><td style="padding:8px 12px;color:#64748b;font-weight:600">${esc(k)}</td><td style="padding:8px 12px;color:#0f172a">${esc(v)}</td></tr>` : "";
  return `<!doctype html><html><body style="font-family:Inter,sans-serif;background:#f8fafc;margin:0;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0">
    <h2 style="color:#1e3a8a;margin:0 0 12px">New booking from the website</h2>
    <p style="color:#334155;margin:0 0 16px">${esc(p.classType)} class — submitted ${new Date().toLocaleString()}</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Name", p.name)}
      ${row("Email", p.email)}
      ${row("WhatsApp", p.whatsapp || "")}
      ${row("Class", p.classType)}
      ${row("Current level", p.level || "")}
      ${row("Goals", p.goals || "")}
      ${row("Preferred times", p.preferredTimes || "")}
      ${row("Language", p.lang || "en")}
    </table>
    <p style="color:#64748b;font-size:12px;margin:20px 0 0">
      Reply directly to this email to contact the student.
    </p>
  </div></body></html>`;
}
