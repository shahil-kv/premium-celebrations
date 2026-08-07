import { useState } from "react";
import { wedding } from "@/lib/wedding";
import { Ornament } from "./Ornament";

export function Cover() {
  const [open, setOpen] = useState(false);

  return (
    <div
      aria-hidden={open}
      className={`fixed inset-0 z-60 flex flex-col items-center justify-center overflow-hidden bg-background transition-opacity duration-700 ${
        open ? "pointer-events-none opacity-0 delay-[1100ms]" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-15 grain-dots" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="font-arabic mb-3 text-2xl text-accent">بِسْمِ اللَّهِ</p>
        <span className="mb-4 font-mono text-[10px] tracking-[0.4em] text-accent/80 uppercase">
          You&rsquo;re invited
        </span>
        <h1 className="font-display mb-4 text-4xl text-foreground md:text-5xl">Nikkah &amp; Walima</h1>
        <Ornament className="mb-10" />

        {/* Arched double door */}
        <div className="relative h-[min(52vh,380px)] w-[min(72vw,300px)] [perspective:1400px]">
          <div className="absolute inset-0 overflow-hidden rounded-t-full border border-accent/30 bg-blush shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
            <div className="absolute inset-0 door-grain" />
          </div>

          <div
            className={`absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden rounded-tl-full border border-accent/30 border-r-accent/20 bg-gradient-to-br from-blush to-secondary transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
              open ? "[transform:rotateY(-105deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 door-grain" />
            <div className="absolute inset-3 rounded-tl-full border border-accent/20" />
          </div>

          <div
            className={`absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden rounded-tr-full border border-accent/30 border-l-accent/20 bg-gradient-to-bl from-blush to-secondary transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
              open ? "[transform:rotateY(105deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 door-grain" />
            <div className="absolute inset-3 rounded-tr-full border border-accent/20" />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the invitation"
            className={`absolute top-1/2 left-1/2 z-20 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/40 bg-card/90 shadow-lg shadow-accent/20 transition-all duration-500 hover:scale-105 ${
              open ? "pointer-events-none scale-75 opacity-0" : "pulse-ring"
            }`}
          >
            <span className="font-display text-lg text-accent italic">{wedding.initials}</span>
            <span className="mt-1 font-mono text-[8px] tracking-[0.25em] text-accent/70 uppercase">
              Tap here
            </span>
          </button>
        </div>

        <p className="mt-10 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {wedding.dateLabel}
        </p>
      </div>
    </div>
  );
}
