import { GeoPattern } from "@/components/wedding/GeoPattern";

/**
 * Fixed atmosphere behind the whole invitation: the star lattice, drifting gold
 * dust and a soft vignette. Values are hard-coded (not random) so the server and
 * client render the same markup.
 */
const DUST = [
  { left: 4, size: 5, delay: 0, duration: 26, sway: 22 },
  { left: 10, size: 3, delay: 12, duration: 34, sway: -14 },
  { left: 16, size: 7, delay: 22, duration: 30, sway: 26 },
  { left: 22, size: 4, delay: 5, duration: 38, sway: -24 },
  { left: 28, size: 6, delay: 30, duration: 28, sway: 16 },
  { left: 34, size: 3, delay: 17, duration: 36, sway: -18 },
  { left: 41, size: 8, delay: 26, duration: 33, sway: 12 },
  { left: 47, size: 4, delay: 8, duration: 40, sway: -28 },
  { left: 53, size: 6, delay: 34, duration: 27, sway: 24 },
  { left: 59, size: 3, delay: 15, duration: 35, sway: -16 },
  { left: 65, size: 7, delay: 24, duration: 31, sway: 18 },
  { left: 71, size: 4, delay: 2, duration: 39, sway: -20 },
  { left: 77, size: 5, delay: 19, duration: 29, sway: 14 },
  { left: 83, size: 3, delay: 32, duration: 37, sway: -26 },
  { left: 89, size: 6, delay: 10, duration: 32, sway: 20 },
  { left: 95, size: 4, delay: 28, duration: 36, sway: -12 },
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
          className="absolute bottom-0 block rounded-full bg-accent/80 rise-dust"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            // Soft halo so the mote reads against the cream background.
            boxShadow: `0 0 ${d.size * 2}px color-mix(in oklab, var(--accent) 45%, transparent)`,
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
