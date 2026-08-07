export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-accent/60 ${className}`}>
      <span className="h-px w-16 origin-right bg-gradient-to-l from-accent/40 to-transparent ornament-line" />
      <svg width="34" height="12" viewBox="0 0 34 12" fill="none" aria-hidden="true">
        <path d="M2 6h7l3-3 3 3-3 3-3-3" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="17" cy="6" r="2.4" stroke="currentColor" strokeWidth="0.8" />
        <path d="M32 6h-7l-3-3-3 3 3 3 3-3" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <span className="h-px w-16 origin-left bg-gradient-to-r from-accent/40 to-transparent ornament-line" />
    </div>
  );
}
