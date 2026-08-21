import { CONFIG } from "../config";

export default function LoveNoteScreen({ onClose }) {
  return (
    <div className="love-note-window">
      <div className="love-note-titlebar">
        <span>♥ love_note.txt</span>
        <button className="love-note-close" onClick={onClose}>✕</button>
      </div>
      <div className="love-note-body">
        {CONFIG.loveNote.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <p className="love-note-signoff">
          xoxo,
          <br />
          {CONFIG.yourName}
        </p>
      </div>
    </div>
  );
}