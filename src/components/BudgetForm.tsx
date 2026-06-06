import { useState, type FormEvent } from 'react';
import type { Budget, Category } from '@/types';
import { CATEGORY_OPTIONS } from '@/constants/categories';

interface BudgetFormProps {
  initial?: Budget;
  onSubmit: (data: { name: string; category: Category; monthly_limit: number }) => void;
  loading?: boolean;
}

export default function BudgetForm({ initial, onSubmit, loading }: BudgetFormProps) {
  const [name, setName] = useState<string>(initial?.name ?? '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'food');
  const [monthlyLimit, setMonthlyLimit] = useState<string>(initial ? String(initial.monthly_limit) : '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      category,
      monthly_limit: parseFloat(monthlyLimit),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Budget Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Monthly Groceries"
          className="w-full rounded-xl border border-warm-border bg-surface px-4 py-2.5 text-sm text-dark placeholder:text-dark-panel/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-grotesk"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Category</label>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                category === c.value
                  ? 'border-brand bg-brand/10 text-brand ring-2 ring-brand/20'
                  : 'border-warm-border bg-surface text-dark-panel/60 hover:border-brand/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Monthly Limit (₹)</label>
        <input
          type="number"
          value={monthlyLimit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
          required
          min="1"
          step="100"
          placeholder="5000"
          className="w-full rounded-xl border border-warm-border bg-surface px-4 py-2.5 text-sm text-dark placeholder:text-dark-panel/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-jetbrains"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full gradient-brand rounded-xl px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-all disabled:opacity-50 glow-brand-sm mt-2"
      >
        {loading ? 'Saving...' : initial ? 'Update Budget' : 'Create Budget'}
      </button>
    </form>
  );
}
