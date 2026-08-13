import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AmbientBackground } from "@/components/wedding/AmbientBackground";
import { ArchDraw } from "@/components/wedding/ArchDraw";
import { CornerFrame } from "@/components/wedding/CornerFrame";
import { Cover } from "@/components/wedding/Cover";
import { Countdown } from "@/components/wedding/Countdown";
import { Ornament } from "@/components/wedding/Ornament";
import { Reveal } from "@/components/wedding/Reveal";
import { ScrollCue } from "@/components/wedding/ScrollCue";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { wedding, mapsUrl, calendarUrl, siteUrl, ogImageUrl } from "@/lib/wedding";

import venueImg from "@/assets/weddingplace.jpeg";
import coupleImg from "@/assets/bride.jpeg";

const title = `${wedding.groom.name} ❤️ ${wedding.bride.name} | Wedding Invitation`;
const description = `We warmly invite you to celebrate our wedding on ${wedding.dateLabel} from ${wedding.timeLabel} at ${wedding.venue.name}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },

      /* WhatsApp only renders the large card when og:image is an absolute URL
         with explicit dimensions; without it, it scrapes a page <img> and
         falls back to the small thumbnail layout. */
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: `${wedding.groom.name} & ${wedding.bride.name}` },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:secure_url", content: ogImageUrl },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `Wedding invitation for ${wedding.groom.name} and ${wedding.bride.name}`,
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImageUrl },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: Invitation,
});

const sections = [
  ["Home", "home"],
  ["Couple", "couple"],
  ["Event", "event"],
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
      <div className="flex items-center justify-between gap-0.5 rounded-full border border-accent/20 bg-card/85 px-2 py-2 shadow-xl shadow-foreground/5 backdrop-blur-md">
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
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      {!opened && <Cover onOpen={() => setOpened(true)} />}

      <AmbientBackground />
      <CornerFrame />
      <ScrollProgress />

      <main className="font-body relative z-10 text-foreground">
        <PillNav />

        {/* Hero */}
        <section
          id="home"
          className={`relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-blush/40 px-6 py-24 text-center ${
            opened ? "" : "stage-hold"
          }`}
        >
          <div className="relative flex flex-col items-center">
            <ArchDraw />

            <div className="relative z-10 flex flex-col items-center">
              {/* The basmala is pulled up on its own; the translation's larger
                  bottom margin keeps everything below it exactly where it was. */}
              <p className="font-arabic -mt-12 mb-3 text-2xl text-accent md:-mt-24 md:text-3xl rise-in [animation-delay:0.15s]">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
              <span className="mb-32 block font-mono text-[10px] leading-relaxed tracking-[0.3em] text-accent/80 uppercase md:mb-44 rise-in [animation-delay:0.35s]">
                In the name of Allah, the Most Gracious, the Most Merciful
              </span>
              <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase rise-in [animation-delay:0.55s]">
                Wedding Invitation
              </p>
              <h1 className="font-display mb-6 text-4xl tracking-tight text-balance italic md:text-7xl rise-in [animation-delay:0.7s]">
                <span className="gold-sheen [animation-delay:2.6s]">
                  {wedding.groom.name} &amp; {wedding.bride.name}
                </span>
              </h1>
              <Ornament className="mb-6 rise-in [animation-delay:0.95s]" />
              <p className="font-display mb-3 text-lg italic md:text-xl rise-in [animation-delay:1.1s]">
                {wedding.dateLabel}
              </p>
              <p className="font-mono text-[10px] tracking-[0.25em] whitespace-nowrap text-muted-foreground uppercase rise-in [animation-delay:1.25s]">
                {wedding.timeLabel}
              </p>
              <p className="mt-2 mb-10 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase rise-in [animation-delay:1.3s]">
                {wedding.venue.name}
              </p>
              <div className="rise-in [animation-delay:1.55s]">
                <ScrollCue />
              </div>
            </div>
          </div>
        </section>

        {/* Ayah */}
        <section id="blessing" className="mx-auto max-w-screen-md px-6 pt-24 pb-8 text-center">
          <Reveal>
            <p className="font-arabic mb-8 text-2xl leading-loose text-accent md:text-3xl">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
              وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </p>
            <p className="mx-auto mb-6 max-w-[50ch] text-base leading-relaxed text-pretty md:text-lg">
              &ldquo;And among His signs is this, that He created for you mates from among
              yourselves, that you may dwell in tranquility with them; and He has put love and mercy
              between your hearts.&rdquo;
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Surah Ar-Rum (30:21)
            </p>
            <Ornament className="mt-12" />
          </Reveal>
        </section>

        {/* Couple */}
        <section
          id="couple"
          className="mx-auto max-w-screen-md scroll-mt-24 px-6 py-20 text-center"
        >
          <Reveal>
            <Eyebrow ar="العروسان" en="The Blessed Couple" />
            <p className="mx-auto mb-12 max-w-[46ch] text-sm leading-loose text-muted-foreground">
              With hearts full of gratitude, the family of the{" "}
              {wedding.hostedBy === "bride" ? "bride" : "groom"} warmly invites you and your family
              to share in this blessed occasion.
            </p>
          </Reveal>

          <Reveal className="mb-12">
            <figure className="group mx-auto max-w-md overflow-hidden arch-frame border border-accent/20 bg-card/70 p-2 shadow-[0_30px_70px_-50px_color-mix(in_oklab,var(--accent)_80%,transparent)]">
              <img
                src={coupleImg}
                alt={`${wedding.groom.name} and ${wedding.bride.name} together`}
                width={900}
                height={900}
                loading="lazy"
                /* Square frame sitting low in the photo: faces only glimpsed,
                   and the photographer's watermark stays out of frame. */
                className="aspect-square w-full object-cover object-[6%_1%] arch-frame transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
              />
            </figure>
          </Reveal>

          <Reveal className="mb-20">
            <p className="font-display text-2xl italic md:text-3xl">
              {wedding.groom.name}
              <span className="mx-3 text-accent not-italic">&amp;</span>
              {wedding.bride.name}
            </p>
            <p className="mt-4 text-sm leading-loose text-muted-foreground italic">
              {wedding.groom.parents}, {wedding.groom.address}
            </p>
            <p className="text-sm leading-loose text-muted-foreground italic">
              {wedding.bride.parents}, {wedding.bride.address}
            </p>
          </Reveal>

          <Reveal>
            <p className="font-arabic mb-6 text-xl text-accent/80">العد التنازلي</p>
            <Countdown />
          </Reveal>
        </section>

        {/* Event */}
        <section id="event" className="scroll-mt-24 border-y border-border bg-card/45 py-24">
          <div className="mx-auto max-w-screen-md px-6">
            <Reveal>
              <Eyebrow ar="تفاصيل الحفل" en="Wedding Ceremony" />
            </Reveal>
            <div id="venue" className="mt-14 grid scroll-mt-24 items-center gap-12 md:grid-cols-2">
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

        {/* Dua footer */}
        <footer className="border-t border-border bg-blush/40 py-24 text-center">
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
      </main>
    </>
  );
}
