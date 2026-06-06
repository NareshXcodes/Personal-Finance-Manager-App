import type { Category } from '@/types';

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'shopping', label: 'Shopping' },
];

export const CATEGORY_VALUES: Category[] = CATEGORY_OPTIONS.map((c) => c.value);
