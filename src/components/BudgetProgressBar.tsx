interface BudgetProgressBarProps {
  percent: number;
  size?: 'sm' | 'md';
}

export default function BudgetProgressBar({ percent, size = 'md' }: BudgetProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const barColor =
    clamped >= 90
      ? 'bg-gradient-to-r from-red-500 to-red-400'
      : clamped >= 70
      ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
      : 'bg-gradient-to-r from-brand-dark to-brand-light';

  const trackHeight = size === 'sm' ? 'h-1.5' : 'h-2.5';
  const glowClass = clamped >= 90 ? 'shadow-[0_0_8px_rgba(239,68,68,0.4)]' : clamped >= 70 ? 'shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'shadow-[0_0_8px_rgba(13,148,136,0.3)]';

  return (
    <div className={`w-full rounded-full bg-dark-panel/10 ${trackHeight} overflow-hidden`}>
      <div
        className={`${trackHeight} rounded-full ${barColor} transition-all duration-700 ease-out ${glowClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
