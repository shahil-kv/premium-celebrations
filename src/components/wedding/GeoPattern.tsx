import { useId } from "react";

/**
 * Tiling khatam (8-point Islamic star) lattice used as the ambient backdrop.
 * Rendered oversized so the slow diagonal drift never exposes an edge.
 */
export function GeoPattern({
  className = "",
  drift = true,
}: {
  className?: string;
  drift?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={`absolute -top-40 -left-40 h-[calc(100%+320px)] w-[calc(100%+320px)] text-accent ${
        drift ? "drift-slow" : ""
      } ${className}`}
    >
      <defs>
        <pattern id={id} width="160" height="160" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <rect x="38" y="38" width="84" height="84" />
            <rect x="38" y="38" width="84" height="84" transform="rotate(45 80 80)" />
            <circle cx="80" cy="80" r="15" />
            <circle cx="80" cy="80" r="2.5" fill="currentColor" stroke="none" />
          </g>
          <g fill="currentColor" stroke="none">
            <circle cx="0" cy="0" r="2" />
            <circle cx="160" cy="0" r="2" />
            <circle cx="0" cy="160" r="2" />
            <circle cx="160" cy="160" r="2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
