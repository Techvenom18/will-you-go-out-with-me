import { useState } from "react";
import CatSolo from "../components/CatSolo";
import { CONFIG } from "../config";
import catGif from "../assets/page4-choose-date-type.gif";

export default function ActivityScreen({ value, onContinue }) {
  const [activity, setActivity] = useState(value.activity || "");

  return (
    <div className="card">
      <div className="portrait-frame">
        <img src={catGif} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <h1 className="pixel-title">What would you like to do?</h1>

      <div className="activity-grid">
        {CONFIG.activities.map((option) => (
          <button
            key={option}
            className={`activity-chip${activity === option ? " selected" : ""}`}
            onClick={() => setActivity(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="pixel-btn"
        disabled={!activity}
        onClick={() => onContinue({ activity })}
      >
        LOCK IT IN 🔒
      </button>
    </div>
  );
}