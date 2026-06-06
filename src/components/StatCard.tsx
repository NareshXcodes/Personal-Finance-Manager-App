import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  variant?: 'default' | 'brand' | 'accent' | 'dark';
  delay?: number;
}

const variants: Record<string, string> = {
  default: 'bg-white border border-warm-border shadow-sm hover:shadow-md',
  brand: 'gradient-brand glow-brand-sm text-white border-0 hover:shadow-lg',
  accent: 'bg-accent/10 border border-accent/20 hover:border-accent/40',
  dark: 'dark-panel text-white border border-white/5 noise-bg',
};

export default function StatCard({ label, value, icon: Icon, variant = 'default', delay = 0 }: StatCardProps) {
  const isBrand = variant === 'brand';
  const isDark = variant === 'dark';
  const textColor = isBrand || isDark ? 'text-white/70' : 'text-dark-panel/60';
  const valueColor = isBrand || isDark ? 'text-white' : 'text-dark';

  return (
    <div
      className={`animate-slide-up stagger-${delay} rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider ${textColor}`}>{label}</p>
          <p className={`mt-2 font-jetbrains text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isBrand
              ? 'bg-white/15'
              : isDark
              ? 'bg-brand/20'
              : 'bg-brand/10'
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              isBrand ? 'text-white' : isDark ? 'text-brand-light' : 'text-brand'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
