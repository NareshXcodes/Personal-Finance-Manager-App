import type { Category } from '@/types';

const categoryConfig: Record<Category, { label: string; color: string; bg: string; dot: string }> = {
  food: { label: 'Food', color: 'text-cat-food', bg: 'bg-cat-food/10 border-cat-food/20', dot: 'bg-cat-food' },
  transport: { label: 'Transport', color: 'text-cat-transport', bg: 'bg-cat-transport/10 border-cat-transport/20', dot: 'bg-cat-transport' },
  utilities: { label: 'Utilities', color: 'text-cat-utilities', bg: 'bg-cat-utilities/10 border-cat-utilities/20', dot: 'bg-cat-utilities' },
  entertainment: { label: 'Entertainment', color: 'text-cat-entertainment', bg: 'bg-cat-entertainment/10 border-cat-entertainment/20', dot: 'bg-cat-entertainment' },
  health: { label: 'Health', color: 'text-cat-health', bg: 'bg-cat-health/10 border-cat-health/20', dot: 'bg-cat-health' },
  education: { label: 'Education', color: 'text-cat-education', bg: 'bg-cat-education/10 border-cat-education/20', dot: 'bg-cat-education' },
  shopping: { label: 'Shopping', color: 'text-cat-shopping', bg: 'bg-cat-shopping/10 border-cat-shopping/20', dot: 'bg-cat-shopping' },
};

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const config = categoryConfig[category] ?? categoryConfig.food;
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.bg} ${config.color} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export { categoryConfig };
