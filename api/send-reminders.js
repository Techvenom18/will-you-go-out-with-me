import { kv } from "./_kv.js";
import { sendEmail } from "./_brevo.js";
import { dayBeforeReminderEmail, dayOfReminderEmail } from "./_email-templates.js";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().split("T")[0];
}

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers["authorization"];
    if (auth !== `Bearer ${secret}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  const herEmail = process.env.HER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL;
  const names = {
    herName: process.env.HER_NAME || "her",
    yourName: process.env.YOUR_NAME || "you",
  };

  if (!herEmail || !process.env.BREVO_API_KEY || !fromEmail) {
    return res.status(200).json({ ok: true, skipped: "email not fully configured" });
  }
  if (!kv) {
    return res.status(200).json({ ok: true, skipped: "KV storage not configured" });
  }

  const latestDate = await kv.get("date-plan:latest");
  if (!latestDate) {
    return res.status(200).json({ ok: true, skipped: "no date on file" });
  }

  const plan = await kv.get(`date-plan:${latestDate}`);
  if (!plan) {
    return res.status(200).json({ ok: true, skipped: "no plan found for stored date" });
  }

  const today = todayISO();
  const tomorrow = addDays(today, 1);
  const sent = [];

  if (plan.date === tomorrow && !plan.reminded_day_before) {
    const { subject, html } = dayBeforeReminderEmail(plan, names);
    await sendEmail({ from: fromEmail, to: herEmail, subject, html });
    plan.reminded_day_before = true;
    sent.push("day_before");
  }

  if (plan.date === today && !plan.reminded_day_of) {
    const { subject, html } = dayOfReminderEmail(plan, names);
    await sendEmail({ from: fromEmail, to: herEmail, subject, html });
    plan.reminded_day_of = true;
    sent.push("day_of");
  }

  if (sent.length > 0) {
    await kv.set(`date-plan:${latestDate}`, plan);
  }

  return res.status(200).json({ ok: true, sent, planDate: plan.date, today });
}