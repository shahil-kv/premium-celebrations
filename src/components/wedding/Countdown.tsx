import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    mins: Math.floor(ms / 60000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown() {
  const target = new Date(wedding.date).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Mins", t.mins],
    ["Secs", t.secs],
  ] as const;

  return (
    <div className="rounded-3xl border border-accent/10 bg-blush/50 py-14">
      <p className="mb-8 font-mono text-[10px] tracking-[0.4em] text-accent uppercase">
        Counting the moments
      </p>
      <div className="flex justify-center gap-8 md:gap-16">
        {items.map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <span
              suppressHydrationWarning
              className="font-display text-4xl tabular-nums transition-opacity duration-500 md:text-6xl"
              style={{ opacity: mounted ? 1 : 0.35 }}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-2 font-mono text-[9px] tracking-widest uppercase">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
