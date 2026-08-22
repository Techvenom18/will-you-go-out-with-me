export async function sendEmail({ from, to, subject, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY not configured");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: from, name: "Date Invite" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Brevo send failed (${response.status}): ${responseText}`);
  }

  return JSON.parse(responseText);

  return response.json();
}