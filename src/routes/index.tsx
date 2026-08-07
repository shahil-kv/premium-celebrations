import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Cover } from "@/components/wedding/Cover";
import { Countdown } from "@/components/wedding/Countdown";
import { Ornament } from "@/components/wedding/Ornament";
import { Reveal } from "@/components/wedding/Reveal";
import { wedding, mapsUrl, calendarUrl, whatsappUrl } from "@/lib/wedding";

import groomImg from "@/assets/groom.jpg";
import brideImg from "@/assets/bride.jpg";
import venueImg from "@/assets/venue.jpg";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

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
  ["Nikkah", "nikkah"],
  ["Memories", "memories"],
] as const;

const memories = [
  { src: memory5, alt: "The nikkah ceremony hall", title: "The Sacred Moment", note: "Qubool Hai — Acceptance", span: "md:col-span-8", ratio: "aspect-video" },
  { src: memory4, alt: "Exchange of rings", title: "Blessed Union", note: wedding.nikkahDate, span: "md:col-span-4 md:mt-16", ratio: "aspect-[3/4]" },
  { src: memory2, alt: "Mehr ceremony details", title: "Mehr Ceremony", note: "The blessed gift", span: "md:col-span-4 md:-mt-10", ratio: "aspect-[3/4]" },
  { src: memory6, alt: "Quran and prayer beads", title: "Duʿā", note: "Prayers for the couple", span: "md:col-span-4", ratio: "aspect-[3/4]" },
  { src: memory3, alt: "Decor and ambiance", title: "Decor & Ambiance", note: "Beautiful arrangements", span: "md:col-span-4 md:mt-16", ratio: "aspect-[3/4]" },
  { src: memory1, alt: "Together forever", title: "Together Forever", note: "In sha Allah — by Allah's will", span: "md:col-span-8 md:-mt-10", ratio: "aspect-video" },
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
      { threshold: [0.2, 0.5], rootMargin: "-15% 0px -45% 0px" },
    );
    sections.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 soft-in [animation-delay:1.4s]">
      <div className="flex items-center justify-between gap-0.5 rounded-full border border-accent/15 bg-card/85 px-2 py-2 shadow-xl shadow-foreground/5 backdrop-blur-md">
        {sections.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex-1 rounded-full px-2 py-1.5 text-center font-mono text-[9px] tracking-[0.15em] uppercase transition-colors ${
              active === id ? "bg-accent/12 text-accent" : "text-muted-foreground hover:text-accent"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Eyebrow({ ar, en }: { ar: string; en: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="font-arabic mb-2 text-xl text-accent/80">{ar}</p>
      <h2 className="font-display text-3xl italic md:text-4xl">{en}</h2>
      <Ornament className="mt-5" />
    </div>
  );
}

function Invitation() {
  return (
    <main className="font-body bg-background text-foreground">
      <Cover />
      <PillNav />

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-blush px-6 py-24 text-center"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20 grain-dots" />
        <div className="relative z-10 rise-in">
          <p className="font-arabic mb-3 text-2xl text-accent md:text-3xl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <span className="mb-10 block font-mono text-[10px] tracking-[0.3em] text-accent/80 uppercase">
            In the name of Allah, the Most Gracious, the Most Merciful
          </span>
          <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            Wedding Invitation
          </p>
          <h1 className="font-display mb-6 text-4xl tracking-tight text-balance italic md:text-7xl">
            {wedding.groom.name} &amp; {wedding.bride.name}
          </h1>
          <Ornament className="mb-6" />
          <p className="font-display mb-10 text-lg italic md:text-xl">{wedding.dateLabel}</p>
          <div className="mx-auto mb-6 h-20 w-px bg-accent/30" />
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground float-slow">
            SCROLL TO UNFOLD
          </p>
        </div>
      </section>

      {/* Ayah */}
      <section className="mx-auto max-w-screen-md px-6 pt-24 pb-8 text-center">
        <Reveal>
          <p className="font-arabic mb-8 text-2xl leading-loose text-accent md:text-3xl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="mx-auto mb-6 max-w-[50ch] text-base leading-relaxed text-pretty md:text-lg">
            &ldquo;And among His signs is this, that He created for you mates from among yourselves,
            that you may dwell in tranquility with them; and He has put love and mercy between your
            hearts.&rdquo;
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Surah Ar-Rum (30:21)
          </p>
          <Ornament className="mt-12" />
        </Reveal>
      </section>

      {/* Couple */}
      <section id="couple" className="mx-auto max-w-screen-md scroll-mt-24 px-6 py-20 text-center">
        <Reveal>
          <Eyebrow ar="العروسان" en="The Blessed Couple" />
        </Reveal>

        <div className="mt-14 mb-24 grid gap-14 md:grid-cols-2">
          <Reveal className="space-y-5">
            <div className="group overflow-hidden arch-frame border border-accent/15 p-2">
              <img
                src={groomImg}
                alt={`Portrait of ${wedding.groom.name}`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover arch-frame transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              />
            </div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">The Groom</p>
            <h3 className="font-display text-2xl italic">{wedding.groom.name}</h3>
            <p className="text-sm text-muted-foreground italic">{wedding.groom.parents}</p>
          </Reveal>

          <Reveal delay={150} className="space-y-5 md:mt-14">
            <div className="group overflow-hidden arch-frame border border-accent/15 p-2">
              <img
                src={brideImg}
                alt={`Portrait of ${wedding.bride.name}`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover arch-frame transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              />
            </div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">The Bride</p>
            <h3 className="font-display text-2xl italic">{wedding.bride.name}</h3>
            <p className="text-sm text-muted-foreground italic">{wedding.bride.parents}</p>
          </Reveal>
        </div>

        <Reveal>
          <p className="font-arabic mb-6 text-xl text-accent/80">العد التنازلي</p>
          <Countdown />
        </Reveal>
      </section>

      {/* Event */}
      <section id="event" className="scroll-mt-24 border-y border-border bg-card/50 py-24">
        <div className="mx-auto max-w-screen-md px-6">
          <Reveal>
            <Eyebrow ar="تفاصيل الحفل" en="Wedding Ceremony" />
          </Reveal>
          <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
            <Reveal className="space-y-6 text-left">
              <div>
                <span className="inline-block rounded-full border border-accent/25 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-accent uppercase">
                  Upcoming
                </span>
                <h3 className="font-display mt-4 text-3xl italic">Wedding Reception</h3>
                <p className="mt-1 text-sm text-muted-foreground italic">
                  وليمة — The Wedding Feast
                </p>
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[9px] tracking-[0.25em] text-accent uppercase">
                    Date
                  </dt>
                  <dd className="mt-1">{wedding.dateLabel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] tracking-[0.25em] text-accent uppercase">
                    Time
                  </dt>
                  <dd className="mt-1">{wedding.timeLabel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] tracking-[0.25em] text-accent uppercase">
                    Venue
                  </dt>
                  <dd className="mt-1 leading-relaxed">
                    {wedding.venue.name}
                    <br />
                    {wedding.venue.address}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-foreground px-6 py-3 font-mono text-[10px] tracking-widest text-background uppercase transition-colors hover:bg-accent"
                >
                  Get Directions
                </a>
                <a
                  href={calendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-6 py-3 font-mono text-[10px] tracking-widest uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  Add to Calendar
                </a>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="group overflow-hidden arch-frame border border-accent/15 p-2">
                <img
                  src={venueImg}
                  alt={`${wedding.venue.name} venue`}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-square w-full object-cover arch-frame transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nikkah */}
      <section id="nikkah" className="mx-auto max-w-screen-md scroll-mt-24 px-6 py-24 text-center">
        <Reveal>
          <Eyebrow ar="ذكريات النكاح" en="Nikkah Memories" />
          <p className="mx-auto mt-10 max-w-[54ch] text-sm leading-loose text-muted-foreground">
            Alhamdulillah — our Nikkah was solemnized on {wedding.nikkahDate}. Here are some
            cherished moments from that blessed ceremony. May Allah bless this union and fill our
            lives with love and barakah. Ameen.
          </p>
        </Reveal>
      </section>

      {/* Memories */}
      <section id="memories" className="mx-auto max-w-screen-xl scroll-mt-24 px-6 pb-28">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {memories.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 120} className={`col-span-12 ${m.span}`}>
              <figure className="group">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={m.src}
                    alt={m.alt}
                    loading="lazy"
                    className={`w-full object-cover ${m.ratio} transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]`}
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="font-display text-lg italic">{m.title}</p>
                  <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                    {m.note}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Dua footer */}
      <footer className="border-t border-border bg-blush/50 py-24 text-center">
        <div className="mx-auto max-w-screen-sm px-6">
          <Reveal>
            <p className="font-arabic mb-6 text-2xl text-accent md:text-3xl">
              جَزَاكُمُ اللَّهُ خَيْرًا
            </p>
            <p className="text-sm leading-loose text-muted-foreground italic">
              May Allah reward you with goodness for joining us on our special day. Your presence
              and heartfelt prayers are the greatest blessing we could ask for.
            </p>
            <Ornament className="my-10" />
            <p className="font-display text-xl italic">
              {wedding.groom.name} &amp; {wedding.bride.name}
            </p>
            <div className="mt-6 font-mono text-[10px] tracking-widest text-muted-foreground/70 uppercase">
              {wedding.hashtag}
            </div>
            <div className="mt-2 font-mono text-[9px] tracking-widest text-muted-foreground/50">
              Made with love &amp; duʿā
            </div>
          </Reveal>
        </div>
        <div className="h-16" />
      </footer>

      {/* WhatsApp RSVP */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-24 z-50 flex items-center gap-2 rounded-full border border-accent/25 bg-card/90 px-4 py-3 font-mono text-[9px] tracking-[0.2em] text-accent uppercase shadow-lg shadow-foreground/5 backdrop-blur-md transition-transform duration-300 hover:scale-105 soft-in [animation-delay:1.6s]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.2Z" />
        </svg>
        Reserve via WhatsApp
      </a>
    </main>
  );
}
