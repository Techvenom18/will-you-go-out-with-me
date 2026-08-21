import { useState, useRef } from "react";
import catGif from "../assets/page1-love.gif";
import { CONFIG } from "../config";

const TAUNTS = [
  "Are you sure?",
  "Really sure?",
  "Cutiee please reconsider 🥺",
  "I'm gonna cry :(",
  "Last chance...",
  "Okay you can't even click it now hehehehe",
];

export default function AskScreen({ onYes }) {
  const [dodge, setDodge] = useState(0);
  const [noStyle, setNoStyle] = useState({});
  const noRef = useRef(null);
  const wrapRef = useRef(null);

  const yesScale = Math.min(1 + dodge * 0.14, 2.2);
  const noScale = Math.max(1 - dodge * 0.14, 0.15);

  function dodgeNo() {
    const wrap = wrapRef.current?.getBoundingClientRect();
    if (!wrap) return;
    const maxX = Math.max(wrap.width / 2 - 60, 20);
    const maxY = Math.max(wrap.height / 2 - 10, 10);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;
    setNoStyle({ transform: `translate(${x}px, ${y}px)` });
    setDodge((d) => Math.min(d + 1, TAUNTS.length));
  }

  const taunt = dodge > 0 ? TAUNTS[Math.min(dodge - 1, TAUNTS.length - 1)] : "";

  return (
    <div className="card">
      <div className="portrait-frame">
        <img src={catGif} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <h1 className="pixel-title">
        Will you go
        <br />
        out with me?
      </h1>

      <div className="yes-no-row" ref={wrapRef}>
        <button
          className="pixel-btn"
          style={{ transform: `scale(${yesScale})`, zIndex: 2 }}
          onClick={onYes}
        >
          YES ✦
        </button>
        <button
          ref={noRef}
          className="pixel-btn secondary no-btn"
          style={{
            transform: `scale(${noScale}) ${noStyle.transform || ""}`,
            opacity: noScale < 0.25 ? 0 : 1,
            pointerEvents: noScale < 0.25 ? "none" : "auto",
          }}
          onMouseEnter={dodgeNo}
          onClick={dodgeNo}
        >
          No
        </button>
      </div>
      <p className="hint-text">{taunt}</p>
      <p className="footer-credit">for {CONFIG.herName}, with love</p>
    </div>
  );
}