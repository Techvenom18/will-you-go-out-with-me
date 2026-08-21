import { kv } from "./_kv.js";
import { Resend } from "resend";
import { organizerNotificationEmail, herConfirmationEmail } from "./_email-templates.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { date, time, place, activity } = req.body || {};

  if (!date || !time || !place || !activity) {
    return res.status(400).json({ error: "Missing date, time, place, or activity" });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  const plan = { date, time, place: String(place).slice(0, 200), activity: String(activity).slice(0, 100) };

  const names = {
    herName: process.env.HER_NAME || "her",
    yourName: process.env.YOUR_NAME || "you",
  };

  if (kv) {
    try {
      await kv.set(`date-plan:${date}`, {
        ...plan,
        reminded_day_before: false,
        reminded_day_of: false,
        createdAt: new Date().toISOString(),
      });
      await kv.set("date-plan:latest", date);
    } catch (err) {
      console.error("KV write failed:", err);
    }
  } else {
    console.warn("KV not configured — reminder emails will not be scheduled.");
  }

  const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;
const organizerEmail = process.env.ORGANIZER_EMAIL;
const herEmail = process.env.HER_EMAIL;

console.log("DEBUG env check:", {
  hasApiKey: Boolean(apiKey),
  hasFromEmail: Boolean(fromEmail),
  hasOrganizerEmail: Boolean(organizerEmail),
  hasHerEmail: Boolean(herEmail),
});

if (!apiKey || !fromEmail || !organizerEmail) {
  console.error("Email env vars not configured");
  return res.status(200).json({ ok: true, emailed: false, reason: "Email not configured" });
}

  const resend = new Resend(apiKey);
  const results = { organizer: false, her: false };

  try {
    const { subject, html } = organizerNotificationEmail(plan, names);
    await resend.emails.send({ from: fromEmail, to: organizerEmail, subject, html });
    results.organizer = true;
  } catch (err) {
    console.error("Failed to email organizer:", err);
  }

  if (herEmail) {
    try {
      const { subject, html } = herConfirmationEmail(plan, names);
      await resend.emails.send({ from: fromEmail, to: herEmail, subject, html });
      results.her = true;
    } catch (err) {
      console.error("Failed to email her confirmation:", err);
    }
  }

  return res.status(200).json({ ok: true, emailed: results });
}