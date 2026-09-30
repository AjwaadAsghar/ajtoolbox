export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="var(--color-accent)" />
      <path
        d="M9 22.5 13.6 9.5h2.2l4.6 13h-2.6l-1-3h-4.3l-1 3H9Zm4.2-5.1h3l-1.5-4.6-1.5 4.6ZM21.2 9.5h2.5v9.2c0 2.6-1.3 4-3.8 4h-.6v-2.2h.4c1 0 1.5-.6 1.5-1.8V9.5Z"
        fill="var(--color-accent-ink)"
      />
    </svg>
  );
}
