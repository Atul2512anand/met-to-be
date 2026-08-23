export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path
        d="M18 54C18 38 30 33 32 13"
        stroke="#C4643E"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M46 54C46 38 34 33 32 13"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="12" r="5.5" fill="#C4643E" />
    </svg>
  );
}
