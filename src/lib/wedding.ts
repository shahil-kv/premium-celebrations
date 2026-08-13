// Edit this file to personalise the invitation.

/** Deployed origin, no trailing slash. Link previews (WhatsApp, iMessage,
 *  Facebook) need absolute URLs, so this must match the live domain. */
export const siteUrl = "https://premium-celebrations.vercel.app";

/** Bump the ?v= when you replace the card so WhatsApp re-scrapes it. */
export const ogImageUrl = `${siteUrl}/og-image.jpg?v=1`;

export const wedding = {
  groom: {
    name: "Rahoof",
    parents: "S/O Abdul Rasheed & Raihanath",
    address: "Edakkuni, Karanthoor",
  },
  bride: {
    name: "Fida",
    parents: "D/O Razak & Rahmath",
    address: "Cholakkunnummal, Koduvally",
  },
  initials: "R & F",
  hashtag: "#RahoofWedsFida",
  hostedBy: "bride" as "bride" | "groom",
  // ISO date of the reception
  date: "2026-08-30T11:00:00+05:30",
  dateLabel: "Sunday, 30th August 2026",
  timeLabel: "11:00 AM to 2:00 PM",
  // Digits only, with country code — used for the RSVP button
  whatsapp: "919999999999",
  venue: {
    name: "Andona Convention Center",
    address: "Andona, Thamarassery, Kerala",
    mapsLink: "https://maps.app.goo.gl/mn9TuNVFP2NMzkkQ9",
  },
} as const;

export const whatsappUrl = `https://wa.me/${wedding.whatsapp}?text=${encodeURIComponent(
  `Assalamu Alaikum! We'd love to join the wedding of ${wedding.groom.name} & ${wedding.bride.name} on ${wedding.dateLabel}.`,
)}`;

export const mapsUrl = wedding.venue.mapsLink;

function toIcsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function calendarUrl() {
  const start = toIcsStamp(wedding.date);
  const end = toIcsStamp(new Date(new Date(wedding.date).getTime() + 3 * 3600_000).toISOString());
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding — ${wedding.groom.name} & ${wedding.bride.name}`,
    dates: `${start}/${end}`,
    details: "Wedding reception. In sha Allah.",
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
