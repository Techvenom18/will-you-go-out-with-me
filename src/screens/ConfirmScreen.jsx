import { useEffect, useState } from "react";
import CatPair from "../components/CatPair";
import { CONFIG } from "../config";
import catGif from "../assets/page5-it's-a-date.gif";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function ConfirmScreen({ plan }) {
  const [status, setStatus] = useState("sending"); // sending | sent | error

  useEffect(() => {
    let cancelled = false;
    async function submit() {
      try {
        const res = await fetch("/api/submit-date", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plan),
        });
        if (!res.ok) throw new Error("request failed");
        if (!cancelled) setStatus("sent");
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    }
    submit();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card">
      <div className="portrait-frame">
        <img src={catGif} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <h1 className="pixel-title">It's a Date!</h1>

      <div className="summary-box">
        <div><span className="summary-label">Date:</span> {formatDate(plan.date)}</div>
        <div><span className="summary-label">Time:</span> {formatTime(plan.time)}</div>
        <div><span className="summary-label">Place:</span> {plan.place}</div>
        <div><span className="summary-label">Activity:</span> {plan.activity}</div>
      </div>

      <p className="status-line">
        {status === "sending" && "sending the news to " + CONFIG.yourName + "... 💌"}
        {status === "sent" && "✓ " + CONFIG.yourName + " has been notified. See you then!"}
        {status === "error" &&
          "Saved! (the notification email couldn't send — check the API setup)"}
      </p>
    </div>
  );
}