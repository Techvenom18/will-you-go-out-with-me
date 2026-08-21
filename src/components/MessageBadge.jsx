export default function MessageBadge({ onClick }) {
  return (
    <button className="message-badge" onClick={onClick}>
      <span className="heart-icon">♥</span>
      1 NEW MESSAGE
    </button>
  );
}