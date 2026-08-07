// Edit this file to personalise the invitation.
export const wedding = {
  groom: {
    name: "Ali Shameem",
    parents: "Son of Mr. Ali V & Mrs. Nafeesa",
    note: "",
  },
  bride: {
    name: "Fathima Fahima",
    parents: "Daughter of Mr. Muhammed Musthafa & Mrs. Fousiya B",
    note: "",
  },
  initials: "A & F",
  hashtag: "#AliShameemWedsFathimaFahima",
  // ISO date of the reception
  date: "2026-08-22T12:00:00+05:30",
  dateLabel: "Saturday, 22nd August 2026",
  timeLabel: "12:00 PM to 3:00 PM",
  nikkahDate: "27th December 2025",
  venue: {
    name: "North View Auditorium",
    address: "Paymbra, Kuruvattoor, Kerala 673571",
    mapsQuery: "North View Auditorium, Paymbra, Kuruvattoor, Kerala 673571",
  },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  wedding.venue.mapsQuery,
)}`;

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
    details: "Walima — the wedding feast. In sha Allah.",
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
