import { useState } from "react";
import CatSolo from "../components/CatSolo";

const FIXED_PLACE = "To Be Decided";

export default function DateScreen({ value, onContinue }) {
  const [date, setDate] = useState(value.date || "");
  const [time, setTime] = useState(value.time || "");

  const today = new Date().toISOString().split("T")[0];
  const canContinue = date && time;

  return (
    <div className="card">
      <div className="portrait-frame">
        <CatSolo mood="happy" />
      </div>
      <h1 className="pixel-title">Pick a Date</h1>
      <p className="subtext">Choose the day &amp; time for our little plan.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          className="pixel-input"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          className="pixel-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="field-group">
        <label className="field-label">Place</label>
        <div className="pixel-input" style={{ background: "#f5eef1", color: "#8a7580", cursor: "not-allowed" }}>
          {FIXED_PLACE}
        </div>
      </div>

      <button
        className="pixel-btn"
        disabled={!canContinue}
        onClick={() => onContinue({ date, time, place: FIXED_PLACE })}
      >
        CONTINUE →
      </button>
    </div>
  );
}