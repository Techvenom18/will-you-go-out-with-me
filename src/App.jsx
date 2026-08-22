import { useState } from "react";
import Scenery from "./components/Scenery";
import MessageBadge from "./components/MessageBadge";
import AskScreen from "./screens/AskScreen";
import YayScreen from "./screens/YayScreen";
import DateScreen from "./screens/DateScreen";
import ActivityScreen from "./screens/ActivityScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import LoveNoteScreen from "./screens/LoveNoteScreen";
import Footer from "./components/Footer";

const STEPS = ["ask", "yay", "date", "activity", "confirm"];

export default function App() {
  const [step, setStep] = useState("ask");
  const [plan, setPlan] = useState({ date: "", time: "", place: "", activity: "" });
  const [showNote, setShowNote] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const showBadge = step === "confirm" && !showNote;

  return (
    <div className="app-shell">
      <Scenery />
      {showBadge && <MessageBadge onClick={() => setShowNote(true)} />}

        <div className="content-area" style={{ position: "relative", zIndex: 2 }}>
        {!showNote && step !== "ask" && step !== "yay" && (
          <div className="progress-dots">
            {STEPS.slice(2).map((s, i) => (
              <span key={s} className={i <= stepIndex - 2 ? "active" : ""} />
            ))}
          </div>
        )}

        {showNote ? (
          <LoveNoteScreen onClose={() => setShowNote(false)} />
        ) : (
          <>
            {step === "ask" && <AskScreen onYes={() => setStep("yay")} />}

            {step === "yay" && <YayScreen onContinue={() => setStep("date")} />}

            {step === "date" && (
              <DateScreen
                value={plan}
                onContinue={(partial) => {
                  setPlan((p) => ({ ...p, ...partial }));
                  setStep("activity");
                }}
              />
            )}

            {step === "activity" && (
              <ActivityScreen
                value={plan}
                onContinue={(partial) => {
                  setPlan((p) => ({ ...p, ...partial }));
                  setStep("confirm");
                }}
              />
            )}

            {step === "confirm" && <ConfirmScreen plan={plan} />}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}