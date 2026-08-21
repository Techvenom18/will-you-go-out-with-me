import CatPair from "../components/CatPair";
import catGif from "../assets/page2-bubbu-dudu.gif";

export default function YayScreen({ onContinue }) {
  return (
    <div className="card">
      <div className="portrait-frame">
           <img src={catGif} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <h1 className="pixel-title">YAY!</h1>
      <p className="subtext">I'm so glad u said yes.</p>

      <button className="pixel-btn" onClick={onContinue}>
        PRESS TO CONTINUE →
      </button>
    </div>
  );
}