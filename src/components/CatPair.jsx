export default function CatPair() {
  return (
   <svg className="idle-bob" width="110" height="90" viewBox="0 0 110 90" xmlns="http://www.w3.org/2000/svg">
      {/* left cat (blush pink) */}
      <polygon points="14,26 22,10 30,27" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <polygon points="44,26 36,10 28,27" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <ellipse cx="29" cy="44" rx="21" ry="19" fill="#ffd6ec" stroke="#3a0d29" strokeWidth="2.3" />
      <ellipse cx="22" cy="47" rx="4" ry="3" fill="#ff8bc9" opacity="0.9" />
      <path d="M20 42 q3 -4 6 0" stroke="#3a0d29" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="42" r="2.2" fill="#3a0d29" />
      <path d="M25 50 q4 3 7 0" stroke="#3a0d29" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* right cat (cream) */}
      <polygon points="66,26 74,10 82,27" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <polygon points="96,26 88,10 80,27" fill="#fff" stroke="#3a0d29" strokeWidth="2" />
      <ellipse cx="81" cy="44" rx="21" ry="19" fill="#fff2f8" stroke="#3a0d29" strokeWidth="2.3" />
      <ellipse cx="88" cy="47" rx="4" ry="3" fill="#ff8bc9" opacity="0.9" />
      <circle cx="76" cy="42" r="2.2" fill="#3a0d29" />
      <path d="M86 42 q3 -4 6 0" stroke="#3a0d29" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M77 50 q4 3 7 0" stroke="#3a0d29" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* joined paws */}
      <ellipse cx="47" cy="70" rx="7" ry="5" fill="#ffd6ec" stroke="#3a0d29" strokeWidth="2" />
      <ellipse cx="63" cy="70" rx="7" ry="5" fill="#fff2f8" stroke="#3a0d29" strokeWidth="2" />

      {/* little heart */}
      <path
        d="M55 58 c-4 -6 -13 -2 -8 5 c2 3 8 8 8 8 s6 -5 8 -8 c5 -7 -4 -11 -8 -5z"
        fill="#ff2f97"
      />
    </svg>
  );
}