export default function Scenery() {
  return (
    <>
      <div className="bg-checker" />
      <div className="clouds">
        <Cloud style={{ top: "8%", left: "6%", width: 70, height: 30 }} />
        <Cloud style={{ top: "16%", right: "8%", width: 90, height: 34, animationDelay: "3s" }} />
        <Cloud style={{ top: "30%", left: "-4%", width: 60, height: 26, animationDelay: "6s" }} />
      </div>
      {[
        { top: "10%", left: "10%" },
        { top: "22%", right: "12%" },
        { top: "45%", left: "6%" },
        { top: "60%", right: "8%" },
        { top: "14%", left: "45%" },
      ].map((pos, i) => (
        <span
          key={i}
          className="sparkle"
          style={{ ...pos, position: "absolute", animationDelay: `${i * 0.5}s`, fontSize: 14 }}
        >
          ✦
        </span>
      ))}
      <FloatingHearts />
      <svg
        className="mountains"
        viewBox="0 0 400 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,140 0,80 60,40 130,90 200,30 270,85 340,50 400,90 400,140" fill="#ff9dd0" />
        <polygon points="0,140 0,110 80,70 160,105 240,65 320,100 400,75 400,140" fill="#ffb8dc" />
      </svg>
    </>
  );
}

function Cloud({ style }) {
  return (
    <div
      className="cloud"
      style={{
        width: style.width,
        height: style.height,
        ...style,
      }}
    />
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 10 }).map((_, i) => ({
    left: `${(i * 11 + 4) % 100}%`,
    delay: `${i * 1.3}s`,
    duration: `${9 + (i % 4)}s`,
    size: 12 + (i % 3) * 6,
  }));

  return (
    <div className="floating-hearts">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="heart-particle"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}