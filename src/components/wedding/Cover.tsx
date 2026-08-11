import { useState } from "react";

import { GeoPattern } from "@/components/wedding/GeoPattern";
import { Ornament } from "@/components/wedding/Ornament";
import { wedding } from "@/lib/wedding";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const open = () => {
    setLeaving(true);
    window.setTimeout(onOpen, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-blush px-5 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        leaving ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
        <GeoPattern />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center rise-in">
        <p className="font-arabic mb-2 text-2xl text-accent">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="mb-8 font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        <div className="relative rounded-[2rem] border border-accent/25 bg-card/90 px-7 py-10 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--accent)_80%,transparent)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-accent/15" />

          <span className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-blush float-slow">
            <svg
              width="34"
              height="34"
              viewBox="0 0 48 48"
              fill="none"
              className="text-accent/70 spin-slow"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="30" height="30" stroke="currentColor" strokeWidth="1" />
              <rect
                x="9"
                y="9"
                width="30"
                height="30"
                transform="rotate(45 24 24)"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <span className="font-display absolute text-[13px] leading-none text-accent italic">
              {wedding.initials}
            </span>
          </span>

          <p className="font-arabic mb-2 text-xl text-accent">وَلِيمَةٌ مُبَارَكَة</p>
          <p className="font-mono text-[9px] tracking-[0.35em] text-muted-foreground uppercase">
            Wedding Invitation
          </p>

          <h1 className="font-display mt-5 text-4xl leading-tight italic">
            {wedding.groom.name}
            <span className="mx-2 text-accent not-italic">&amp;</span>
            {wedding.bride.name}
          </h1>

          <Ornament className="my-5" />

          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {wedding.dateLabel}
          </p>

          <button
            type="button"
            onClick={open}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[10px] tracking-[0.25em] text-accent-foreground uppercase transition-transform duration-300 hover:scale-[1.02] pulse-ring"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Open Invitation
          </button>
        </div>

        <p className="mt-6 font-mono text-[9px] tracking-[0.3em] text-accent/70 uppercase">
          ✦ Tap to reveal the invitation ✦
        </p>
      </div>
    </div>
  );
}
