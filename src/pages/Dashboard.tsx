import { useState, useEffect, useCallback } from 'react';
import { Plus, TrendingUp, Receipt, Crown, FolderOpen, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Expense, Budget, Category } from '@/types';
import { CATEGORY_VALUES } from '@/constants/categories';
import { budgetApi, expenseApi } from '@/api';
import { formatCurrency, formatDate } from '@/utils/format';
import StatCard from '@/components/StatCard';
import CategoryBadge from '@/components/CategoryBadge';
import Modal from '@/components/Modal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import ExpenseForm from '@/components/ExpenseForm';
import { Skeleton, TableRowSkeleton } from '@/components/Skeleton';

const ALL_CATEGORIES = 'all';
type FilterOption = Category | typeof ALL_CATEGORIES;

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterOption>(ALL_CATEGORIES);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editExpense, setEditExpense] = useState<Expense | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [exp, bud] = await Promise.all([expenseApi.getAll(), budgetApi.getAll()]);
      setExpenses(exp);
      setBudgets(bud);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const now = new Date();
  const thisMonthExpenses = expenses.filter((e) => {
    const d = new Date(e.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const filtered = filter === ALL_CATEGORIES
    ? thisMonthExpenses
    : thisMonthExpenses.filter((e) => e.category === filter);

  const totalSpent = thisMonthExpenses.reduce((s, e) => s + e.amount, 0);
  const highest = thisMonthExpenses.length > 0
    ? thisMonthExpenses.reduce((m, e) => (e.amount > m.amount ? e : m), thisMonthExpenses[0])
    : null;

  const catTotals: Record<string, number> = {};
  thisMonthExpenses.forEach((e) => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  const handleAdd = () => { setEditExpense(undefined); setModalOpen(true); };
  const handleEdit = (expense: Expense) => { setEditExpense(expense); setModalOpen(true); };
  const handleFormSubmit = async (data: { title: string; amount: number; category: Category; budget_id: number }) => {
    setFormLoading(true);
    try {
      if (editExpense) {
        await expenseApi.update(editExpense.id, data);
        toast.success('Expense updated');
      } else {
        await expenseApi.create(data);
        toast.success('Expense added');
      }
      setModalOpen(false);
      setEditExpense(undefined);
      fetchData();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await expenseApi.delete(deleteTarget.id);
      toast.success('Expense deleted');
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  const categories: FilterOption[] = [ALL_CATEGORIES, ...CATEGORY_VALUES];

  return (
    <div className="py-8 space-y-8">
      {/* Hero */}
      <div className="gradient-hero rounded-3xl p-8 noise-bg relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="relative">
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Total Spent This Month</p>
          <h1 className="font-jetbrains text-5xl font-bold text-white mt-3 tracking-tight">
            {loading ? <Skeleton className="h-14 w-48 inline-block" /> : formatCurrency(totalSpent)}
          </h1>
          <p className="text-white/40 mt-2 text-sm">
            {thisMonthExpenses.length} transaction{thisMonthExpenses.length !== 1 ? 's' : ''} across {budgets.length} budget{budgets.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all glow-brand-sm"
        >
          <Plus className="h-4 w-4" /> Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Entries" value={String(thisMonthExpenses.length)} icon={Receipt} delay={1} />
        <StatCard label="Highest Expense" value={highest ? formatCurrency(highest.amount) : '—'} icon={TrendingUp} variant="accent" delay={2} />
        <StatCard label="Top Category" value={topCat.charAt(0).toUpperCase() + topCat.slice(1)} icon={Crown} variant="dark" delay={3} />
        <StatCard label="Active Budgets" value={String(budgets.length)} icon={FolderOpen} delay={4} />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Search className="h-4 w-4 text-dark-panel/30 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              filter === cat
                ? 'gradient-brand text-white glow-brand-sm'
                : 'bg-white border border-warm-border text-dark-panel/60 hover:border-brand/30 hover:text-brand'
            }`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Expense Table */}
      <div className="rounded-2xl border border-warm-border bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-border bg-warm/50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Title</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warm">
                        <Receipt className="h-8 w-8 text-dark-panel/20" />
                      </div>
                      <p className="text-sm font-medium text-dark-panel/40">No expenses found</p>
                      <button onClick={handleAdd} className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
                        + Add your first expense
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((expense, i) => (
                  <tr
                    key={expense.id}
                    className={`animate-fade-in stagger-${Math.min(i + 1, 6)} hover:bg-brand/[0.03] transition-colors`}
                  >
                    <td className="px-5 py-4 text-sm font-medium text-dark">{expense.title}</td>
                    <td className="px-5 py-4 text-sm font-jetbrains font-semibold text-dark">{formatCurrency(expense.amount)}</td>
                    <td className="px-5 py-4"><CategoryBadge category={expense.category} /></td>
                    <td className="px-5 py-4 text-sm text-dark-panel/50 font-jetbrains">{formatDate(expense.created_at)}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/10 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(expense)}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-danger hover:bg-danger/10 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditExpense(undefined); }}
        title={editExpense ? 'Edit Expense' : 'Add Expense'}
      >
        <ExpenseForm
          budgets={budgets}
          initial={editExpense}
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title ?? ''}
        loading={deleteLoading}
      />
    </div>
  );
}
