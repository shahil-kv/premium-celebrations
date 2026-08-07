import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Cover } from "@/components/wedding/Cover";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal } from "@/components/wedding/Reveal";
import { wedding, mapsUrl, calendarUrl } from "@/lib/wedding";

import groomImg from "@/assets/groom.jpg";
import brideImg from "@/assets/bride.jpg";
import venueImg from "@/assets/venue.jpg";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

const title = `${wedding.groom.name} & ${wedding.bride.name} — Wedding Invitation`;
const description = `Join us for the walima of ${wedding.groom.name} & ${wedding.bride.name} on ${wedding.dateLabel} at ${wedding.venue.name}, ${wedding.venue.address}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const sections = [
  ["Home", "home"],
  ["Couple", "couple"],
  ["Event", "event"],
  ["Memories", "memories"],
] as const;

function PillNav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -40% 0px" },
    );
    sections.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 soft-in [animation-delay:1s]">
      <div className="flex items-center gap-1 rounded-full border border-card bg-card/80 px-3 py-2 shadow-xl shadow-foreground/5 ring-1 ring-foreground/5 backdrop-blur-md">
        {sections.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`rounded-full px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${
              active === id
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Ornament() {
  return <div className="mx-auto h-px w-24 bg-accent/25 ornament-line" />;
}

function Invitation() {
  return (
    <main className="font-body bg-background text-foreground">
      <Cover />
      <PillNav />

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-blush p-8 text-center"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20 grain-dots" />
        <div className="relative z-10 rise-in">
          <span className="mb-8 block font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
            Bismillahir Rahmanir Raheem
          </span>
          <h1 className="font-display mb-6 text-5xl tracking-tight text-balance italic md:text-7xl">
            {wedding.groom.name} &amp; {wedding.bride.name}
          </h1>
          <p className="font-display mb-10 text-lg italic md:text-xl">{wedding.dateLabel}</p>
          <div className="mx-auto mb-6 h-24 w-px bg-accent/30" />
          <p className="font-mono text-xs tracking-widest text-muted-foreground">
            SCROLL TO UNFOLD
          </p>
        </div>
      </section>

      {/* Ayah + Couple + Countdown */}
      <section className="mx-auto max-w-screen-md px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-display mb-10 text-3xl text-accent italic">
            بارك الله لكما وبارك عليكما
          </h2>
          <p className="mx-auto mb-14 max-w-[50ch] text-lg leading-relaxed text-pretty">
            &ldquo;And among His signs is this, that He created for you mates from among yourselves,
            that you may dwell in tranquility with them.&rdquo;
          </p>
          <div className="mb-16">
            <Ornament />
          </div>
        </Reveal>

        <div id="couple" className="mb-28 grid scroll-mt-24 gap-16 md:grid-cols-2">
          <Reveal className="space-y-6">
            <div className="group overflow-hidden rounded-sm">
              <img
                src={groomImg}
                alt={`Portrait of ${wedding.groom.name}`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="font-display text-2xl italic">{wedding.groom.name}</h3>
            <p className="text-sm text-muted-foreground italic">{wedding.groom.parents}</p>
          </Reveal>

          <Reveal delay={150} className="space-y-6 md:mt-12">
            <div className="group overflow-hidden rounded-sm">
              <img
                src={brideImg}
                alt={`Portrait of ${wedding.bride.name}`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="font-display text-2xl italic">{wedding.bride.name}</h3>
            <p className="text-sm text-muted-foreground italic">{wedding.bride.parents}</p>
          </Reveal>
        </div>

        <Reveal>
          <Countdown />
        </Reveal>
      </section>

      {/* Event */}
      <section id="event" className="scroll-mt-24 border-y border-border bg-card/50 py-24">
        <div className="mx-auto max-w-screen-md px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal className="space-y-6 text-left">
              <h2 className="font-display text-4xl italic">The Walima</h2>
              <p className="text-muted-foreground">
                {wedding.dateLabel}
                <br />
                {wedding.timeLabel}
              </p>
              <p className="pb-4 text-sm leading-relaxed">
                {wedding.venue.name}
                <br />
                {wedding.venue.address}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-foreground px-6 py-3 font-mono text-xs tracking-widest text-background uppercase transition-colors hover:bg-accent"
                >
                  Get Directions
                </a>
                <a
                  href={calendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-6 py-3 font-mono text-xs tracking-widest uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  Add to Calendar
                </a>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="group overflow-hidden rounded-sm">
                <img
                  src={venueImg}
                  alt={`${wedding.venue.name} venue`}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Memories */}
      <section id="memories" className="mx-auto max-w-screen-xl scroll-mt-24 px-6 py-28">
        <Reveal>
          <h2 className="font-display mb-4 text-center text-3xl italic">Nikkah Memories</h2>
          <p className="mx-auto mb-16 max-w-[52ch] text-center text-sm text-muted-foreground italic">
            Alhamdulillah — our Nikkah was solemnized on {wedding.nikkahDate}. A few cherished
            moments from that blessed day.
          </p>
        </Reveal>
        <div className="grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-8">
            <div className="group overflow-hidden">
              <img
                src={memory1}
                alt="The blessed day"
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-4 font-mono text-[9px] tracking-widest uppercase">
              The Sacred Moment
            </p>
          </Reveal>
          <Reveal delay={120} className="col-span-6 mt-8 md:col-span-4 md:mt-24">
            <div className="group overflow-hidden">
              <img
                src={memory2}
                alt="Mehr ceremony details"
                width={600}
                height={800}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-4 font-mono text-[9px] tracking-widest uppercase">Mehr &amp; Duʿā</p>
          </Reveal>
          <Reveal delay={240} className="col-span-6 -mt-4 md:col-span-4 md:-mt-12">
            <div className="group overflow-hidden">
              <img
                src={memory3}
                alt="Decor and ambiance"
                width={600}
                height={800}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-4 font-mono text-[9px] tracking-widest uppercase">Decor &amp; Ambiance</p>
          </Reveal>
        </div>
      </section>

      {/* Dua footer */}
      <footer className="border-t border-border bg-blush/40 py-28 text-center">
        <div className="mx-auto max-w-screen-sm px-6">
          <Reveal>
            <h2 className="font-display mb-8 text-2xl italic">جزاكم الله خيرا</h2>
            <p className="text-sm leading-loose text-muted-foreground italic">
              We thank you for your love, your prayers, and for being part of our story.
              <br />
              May Allah bless this union and fill our lives with barakah. Ameen.
            </p>
            <div className="mt-16 font-mono text-[10px] tracking-widest opacity-40 italic">
              {wedding.hashtag}
            </div>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
