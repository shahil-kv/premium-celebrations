const CORNERS = [
  "top-4 left-4",
  "top-4 right-4 rotate-90",
  "bottom-4 right-4 rotate-180",
  "bottom-4 left-4 -rotate-90",
] as const;

/** Thin gold brackets that frame the viewport, as on a printed invitation card. */
export function CornerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      {CORNERS.map((position, i) => (
        <svg
          key={position}
          viewBox="0 0 48 48"
          fill="none"
          className={`absolute h-8 w-8 text-accent/35 md:h-12 md:w-12 ${position} soft-in`}
          style={{ animationDelay: `${1.1 + i * 0.12}s` }}
        >
          <path d="M1 48V13C1 6.4 6.4 1 13 1h35" stroke="currentColor" strokeWidth="1" />
          <path d="M8 48V16c0-4.4 3.6-8 8-8h32" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="14" cy="14" r="1.6" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
