/**
 * The hero signature: a two-centred (pointed) arch that draws itself in behind
 * the couple's names, echoing the arch-framed photographs further down the page.
 */
export function ArchDraw({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, #000 52%, transparent 92%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 52%, transparent 92%)",
      }}
      className={`pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[min(860px,94vw)] -translate-x-1/2 -translate-y-1/2 text-accent ${className}`}
    >
      <path
        d="M18 400V200C18 112 84 62 150 18c66 44 132 94 132 182v200"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
        pathLength={1}
        className="arch-stroke"
      />
      <path
        d="M34 400V206C34 126 92 80 150 40c58 40 116 86 116 166v194"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="0.8"
        pathLength={1}
        className="arch-stroke [animation-delay:0.75s]"
      />
      <circle
        cx="150"
        cy="18"
        r="2.5"
        fill="currentColor"
        fillOpacity="0.5"
        className="soft-in [animation-delay:2.4s]"
      />
    </svg>
  );
}
