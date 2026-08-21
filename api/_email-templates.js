function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function wrapper(title, bodyHtml) {
  return `
  <div style="font-family: Georgia, 'Times New Roman', serif; background:#faf6f8; padding:32px 16px;">
    <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfe6; border-radius:10px; overflow:hidden;">
      <div style="background:#c2185b; padding:22px 28px;">
        <h1 style="margin:0; color:#ffffff; font-size:19px; font-weight:600; letter-spacing:0.3px;">${title}</h1>
      </div>
      <div style="padding:28px;">
        ${bodyHtml}
      </div>
      <div style="padding:16px 28px; background:#faf6f8; color:#9a8b92; font-size:12px;">
        This is an automated notification from your date-planning site.
      </div>
    </div>
  </div>`;
}

function detailsTable(plan) {
  return `
    <table style="width:100%; border-collapse:collapse; margin:18px 0; font-size:15px; color:#3a0d29;">
      <tr>
        <td style="padding:8px 0; color:#8a7580; width:100px;">Date</td>
        <td style="padding:8px 0; font-weight:600;">${formatDate(plan.date)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0; color:#8a7580;">Time</td>
        <td style="padding:8px 0; font-weight:600;">${formatTime(plan.time)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0; color:#8a7580;">Place</td>
        <td style="padding:8px 0; font-weight:600;">${plan.place}</td>
      </tr>
      <tr>
        <td style="padding:8px 0; color:#8a7580;">Activity</td>
        <td style="padding:8px 0; font-weight:600;">${plan.activity}</td>
      </tr>
    </table>`;
}

export function organizerNotificationEmail(plan, names) {
  const subject = `${names.herName} said yes! Your date is confirmed`;
  const html = wrapper(
    "Date Confirmed",
    `
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">Dear ${names.yourName},</p>
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">
      This is a confirmation that ${names.herName} has responded and selected the details below for your upcoming date.
    </p>
    ${detailsTable(plan)}
    <p style="margin:16px 0 0; color:#3a0d29; font-size:15px;">
      A reminder email will automatically be sent to ${names.herName} one day before, and again on the day of the date.
    </p>
    `
  );
  return { subject, html };
}

export function herConfirmationEmail(plan, names) {
  const subject = `Your date with ${names.yourName} is confirmed`;
  const html = wrapper(
    "Date Confirmed",
    `
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">Dear ${names.herName},</p>
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">
      Thank you for confirming your plans with ${names.yourName}. Please find the details of your date below.
    </p>
    ${detailsTable(plan)}
    <p style="margin:16px 0 0; color:#3a0d29; font-size:15px;">
      You will receive a reminder the day before, and another on the day of the date.
    </p>
    `
  );
  return { subject, html };
}

export function dayBeforeReminderEmail(plan, names) {
  const subject = `Reminder: your date with ${names.yourName} is tomorrow`;
  const html = wrapper(
    "Reminder — Date Tomorrow",
    `
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">Dear ${names.herName},</p>
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">
      This is a friendly reminder that your date with ${names.yourName} is scheduled for tomorrow.
      Please find the details below.
    </p>
    ${detailsTable(plan)}
    <p style="margin:16px 0 0; color:#3a0d29; font-size:15px;">We look forward to it!</p>
    `
  );
  return { subject, html };
}

export function dayOfReminderEmail(plan, names) {
  const subject = `Today is the day: your date with ${names.yourName}`;
  const html = wrapper(
    "Today Is The Date",
    `
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">Dear ${names.herName},</p>
    <p style="margin:0 0 8px; color:#3a0d29; font-size:15px;">
      This is a reminder that today is the day of your date with ${names.yourName}. Please find the confirmed details below.
    </p>
    ${detailsTable(plan)}
    <p style="margin:16px 0 0; color:#3a0d29; font-size:15px;">Have a wonderful time!</p>
    `
  );
  return { subject, html };
}