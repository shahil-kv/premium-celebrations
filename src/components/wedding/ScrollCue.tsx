export function ScrollCue({
  label = "Scroll to unfold",
  href = "#couple",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-80"
    >
      <span className="font-mono text-[9px] tracking-[0.35em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="relative block h-16 w-px overflow-hidden bg-accent/20">
        <span className="absolute inset-x-0 top-0 block h-6 bg-gradient-to-b from-transparent via-accent to-transparent scroll-drop" />
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent/70 float-slow"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  );
}
