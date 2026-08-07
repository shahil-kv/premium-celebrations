import { useState } from "react";
import { wedding } from "@/lib/wedding";

export function Cover() {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      aria-label="Open the invitation"
      onClick={() => setOpen(true)}
      className={`fixed inset-0 z-60 flex w-full flex-col items-center justify-center bg-blush transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        open ? "pointer-events-none -translate-y-full opacity-0" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--accent) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-8 font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
          Bismillahir Rahmanir Raheem
        </span>
        <div className="mb-8 flex size-24 items-center justify-center rounded-full border border-accent/30">
          <span className="font-display text-xl tracking-widest text-accent italic">
            {wedding.initials}
          </span>
        </div>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Tap to open
        </p>
      </div>
    </button>
  );
}
