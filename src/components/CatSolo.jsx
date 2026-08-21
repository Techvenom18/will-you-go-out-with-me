export default function CatSolo({ mood = "shy" }) {
  return (
    <svg className="idle-bob" width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* ears */}
      <polygon points="20,28 30,8 38,30" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <polygon points="70,28 60,8 52,30" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <polygon points="24,26 30,14 34,27" fill="#ffb3dd" />
      <polygon points="66,26 60,14 56,27" fill="#ffb3dd" />
      {/* head */}
      <ellipse cx="45" cy="48" rx="27" ry="24" fill="#fff" stroke="#3a0d29" strokeWidth="2.5" />
      {/* body */}
      <ellipse cx="45" cy="78" rx="20" ry="12" fill="#fff" stroke="#3a0d29" strokeWidth="2.5" />
      {/* blush */}
      <ellipse cx="27" cy="52" rx="5" ry="3.5" fill="#ffb3dd" opacity="0.9" />
      <ellipse cx="63" cy="52" rx="5" ry="3.5" fill="#ffb3dd" opacity="0.9" />
      {mood === "shy" ? (
        <>
          <path d="M33 46 q4 -5 8 0" stroke="#3a0d29" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M49 46 q4 -5 8 0" stroke="#3a0d29" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="37" cy="46" r="2.6" fill="#3a0d29" />
          <circle cx="53" cy="46" r="2.6" fill="#3a0d29" />
        </>
      )}
      <path d="M41 56 q4 4 8 0" stroke="#3a0d29" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M14 50 h10 M14 56 h9" stroke="#3a0d29" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M76 50 h-10 M76 56 h-9" stroke="#3a0d29" strokeWidth="1.5" strokeLinecap="round" />
      {/* paws */}
      <ellipse cx="34" cy="86" rx="6" ry="4" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <ellipse cx="56" cy="86" rx="6" ry="4" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
    </svg>
  );
}