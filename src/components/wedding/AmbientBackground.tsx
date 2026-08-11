import { GeoPattern } from "@/components/wedding/GeoPattern";

/**
 * Fixed atmosphere behind the whole invitation: the star lattice, drifting gold
 * dust and a soft vignette. Values are hard-coded (not random) so the server and
 * client render the same markup.
 */
const DUST = [
  { left: 4, size: 3, delay: 0, duration: 26, sway: 18 },
  { left: 11, size: 2, delay: 7, duration: 34, sway: -12 },
  { left: 18, size: 4, delay: 14, duration: 30, sway: 22 },
  { left: 25, size: 2, delay: 3, duration: 38, sway: -20 },
  { left: 32, size: 3, delay: 19, duration: 28, sway: 14 },
  { left: 39, size: 2, delay: 11, duration: 36, sway: -16 },
  { left: 46, size: 5, delay: 24, duration: 32, sway: 10 },
  { left: 53, size: 2, delay: 5, duration: 40, sway: -24 },
  { left: 60, size: 3, delay: 16, duration: 27, sway: 20 },
  { left: 67, size: 2, delay: 9, duration: 35, sway: -14 },
  { left: 74, size: 4, delay: 21, duration: 31, sway: 16 },
  { left: 81, size: 2, delay: 1, duration: 39, sway: -18 },
  { left: 88, size: 3, delay: 13, duration: 29, sway: 12 },
  { left: 95, size: 2, delay: 26, duration: 37, sway: -22 },
];

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]">
        <GeoPattern />
      </div>

      {DUST.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 block rounded-full bg-accent/50 rise-dust"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `-${d.delay}s`,
            animationDuration: `${d.duration}s`,
            ["--sway" as string]: `${d.sway}px`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_40%,color-mix(in_oklab,var(--accent)_9%,transparent)_100%)]" />
    </div>
  );
}
