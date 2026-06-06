import { useState, type FormEvent } from 'react';
import type { Budget, Category, Expense } from '@/types';
import { CATEGORY_OPTIONS } from '@/constants/categories';

interface ExpenseFormProps {
  budgets: Budget[];
  initial?: Expense;
  onSubmit: (data: { title: string; amount: number; category: Category; budget_id: number }) => void;
  loading?: boolean;
}

export default function ExpenseForm({ budgets, initial, onSubmit, loading }: ExpenseFormProps) {
  const [title, setTitle] = useState<string>(initial?.title ?? '');
  const [amount, setAmount] = useState<string>(initial ? String(initial.amount) : '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'food');
  const [budgetId, setBudgetId] = useState<string>(initial ? String(initial.budget_id) : budgets[0] ? String(budgets[0].id) : '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      budget_id: parseInt(budgetId, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Lunch at restaurant"
          className="w-full rounded-xl border border-warm-border bg-surface px-4 py-2.5 text-sm text-dark placeholder:text-dark-panel/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-grotesk"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
          placeholder="0.00"
          className="w-full rounded-xl border border-warm-border bg-surface px-4 py-2.5 text-sm text-dark placeholder:text-dark-panel/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-jetbrains"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full rounded-xl border border-warm-border bg-surface px-4 py-2.5 text-sm text-dark focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-grotesk appearance-none cursor-pointer"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-dark-panel">Budget</label>
        <select
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
          required
          className="w-full rounded-xl border border-warm-border bg-surface px-4 py-2.5 text-sm text-dark focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-grotesk appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a budget</option>
          {budgets.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !budgetId}
        className="w-full gradient-brand rounded-xl px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-all disabled:opacity-50 glow-brand-sm mt-2"
      >
        {loading ? 'Saving...' : initial ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
}
