export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="16" width="7" height="12" rx="3.5" fill="url(#paint0_linear)" />
      <rect x="12.5" y="10" width="7" height="18" rx="3.5" fill="url(#paint1_linear)" />
      <rect x="22" y="4" width="7" height="24" rx="3.5" fill="url(#paint2_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="6.5" y1="16" x2="6.5" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="16" y1="10" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="paint2_linear" x1="25.5" y1="4" x2="25.5" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
