import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Percent, Receipt, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Budget, Expense, BudgetSummary, Category } from '@/types';
import { budgetApi, expenseApi } from '@/api';
import { formatCurrency, formatDate } from '@/utils/format';
import StatCard from '@/components/StatCard';
import CategoryBadge from '@/components/CategoryBadge';
import Modal from '@/components/Modal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import ExpenseForm from '@/components/ExpenseForm';
import BudgetForm from '@/components/BudgetForm';
import { Skeleton } from '@/components/Skeleton';

export default function BudgetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const budgetId = Number(id);

  const [budget, setBudget] = useState<Budget | null>(null);
  const [summary, setSummary] = useState<BudgetSummary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [allBudgets, setAllBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [editBudgetOpen, setEditBudgetOpen] = useState<boolean>(false);
  const [editBudgetLoading, setEditBudgetLoading] = useState<boolean>(false);
  const [deleteBudgetOpen, setDeleteBudgetOpen] = useState<boolean>(false);
  const [deleteBudgetLoading, setDeleteBudgetLoading] = useState<boolean>(false);

  const [editExpense, setEditExpense] = useState<Expense | undefined>(undefined);
  const [deleteExpenseTarget, setDeleteExpenseTarget] = useState<Expense | null>(null);
  const [expenseFormLoading, setExpenseFormLoading] = useState<boolean>(false);
  const [deleteExpenseLoading, setDeleteExpenseLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const [b, e, all] = await Promise.all([
          budgetApi.getById(budgetId),
          budgetApi.getExpenses(budgetId),
          budgetApi.getAll(),
        ]);
        setBudget(b);
        setExpenses(e);
        setAllBudgets(all);
        
        // Calculate summary dynamically to ensure it's always up-to-date
        const now = new Date();
        const currentMonthExpenses = e.filter((exp) => {
          const d = new Date(exp.created_at);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const totalSpent = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        setSummary({
          budget_name: b.name,
          category: b.category,
          total_spent: totalSpent,
          monthly_limit: b.monthly_limit,
          remaining: b.monthly_limit - totalSpent,
          percent_used: b.monthly_limit > 0 ? (totalSpent / b.monthly_limit) * 100 : 0,
        });
      } catch {
        toast.error('Failed to load budget');
        navigate('/budgets');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [budgetId, navigate]);

  const refreshData = async () => {
    try {
      const [b, e] = await Promise.all([
        budgetApi.getById(budgetId),
        budgetApi.getExpenses(budgetId),
      ]);
      setBudget(b);
      setExpenses(e);

      // Calculate summary dynamically
      const now = new Date();
      const currentMonthExpenses = e.filter((exp) => {
        const d = new Date(exp.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      const totalSpent = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      setSummary({
        budget_name: b.name,
        category: b.category,
        total_spent: totalSpent,
        monthly_limit: b.monthly_limit,
        remaining: b.monthly_limit - totalSpent,
        percent_used: b.monthly_limit > 0 ? (totalSpent / b.monthly_limit) * 100 : 0,
      });
    } catch { /* silent */ }
  };

  const handleEditBudget = async (data: { name: string; category: Category; monthly_limit: number }) => {
    setEditBudgetLoading(true);
    try {
      await budgetApi.update(budgetId, data);
      toast.success('Budget updated');
      setEditBudgetOpen(false);
      refreshData();
    } catch {
      toast.error('Update failed');
    } finally {
      setEditBudgetLoading(false);
    }
  };

  const handleDeleteBudget = async () => {
    setDeleteBudgetLoading(true);
    try {
      await budgetApi.delete(budgetId);
      toast.success('Budget deleted');
      navigate('/budgets');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteBudgetLoading(false);
    }
  };

  const handleExpenseSubmit = async (data: { title: string; amount: number; category: Category; budget_id: number }) => {
    setExpenseFormLoading(true);
    try {
      if (editExpense) {
        await expenseApi.update(editExpense.id, data); // imported from api
        toast.success('Expense updated');
      }
      setEditExpense(undefined);
      refreshData();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setExpenseFormLoading(false);
    }
  };

  const handleDeleteExpense = async () => {
    if (!deleteExpenseTarget) return;
    setDeleteExpenseLoading(true);
    try {
      await expenseApi.delete(deleteExpenseTarget.id);
      toast.success('Expense deleted');
      setDeleteExpenseTarget(null);
      refreshData();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteExpenseLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-40 w-full rounded-3xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (!budget || !summary) return null;

  const percent = summary.percent_used;
  const barColor = percent >= 90 ? 'from-red-500 to-red-400' : percent >= 70 ? 'from-amber-500 to-yellow-400' : 'from-brand-dark to-brand-light';

  return (
    <div className="py-8 space-y-8">
      {/* Back + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <button
          onClick={() => navigate('/budgets')}
          className="flex items-center gap-2 text-sm font-medium text-dark-panel/50 hover:text-brand transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Budgets
        </button>
        <div className="flex gap-2 w-full sm:w-auto grid grid-cols-2 sm:flex">
          <button
            onClick={() => setEditBudgetOpen(true)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-warm-border px-4 py-2 text-sm font-semibold text-dark-panel/60 hover:border-brand/30 hover:text-brand transition-all"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={() => setDeleteBudgetOpen(true)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-danger/20 px-4 py-2 text-sm font-semibold text-danger/60 hover:border-danger/40 hover:text-danger transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="gradient-hero rounded-3xl p-8 noise-bg relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative">
          <CategoryBadge category={budget.category} size="md" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">{budget.name}</h1>
          <div className="mt-6 flex items-end gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                <span>{formatCurrency(summary.total_spent)} spent</span>
                <span>{formatCurrency(summary.monthly_limit)} limit</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`}
                  style={{ width: `${Math.min(100, percent)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Limit" value={formatCurrency(summary.monthly_limit)} icon={Wallet} variant="dark" delay={1} />
        <StatCard label="Total Spent" value={formatCurrency(summary.total_spent)} icon={TrendingUp} variant="brand" delay={2} />
        <StatCard label="Remaining" value={formatCurrency(Math.max(0, summary.remaining))} icon={TrendingDown} variant="accent" delay={3} />
        <StatCard label="Used" value={`${percent.toFixed(1)}%`} icon={Percent} delay={4} />
      </div>

      {/* Expenses Table */}
      <div className="rounded-2xl border border-warm-border bg-white overflow-hidden shadow-sm animate-slide-up stagger-3">
        <div className="flex items-center justify-between px-5 py-4 border-b border-warm-border">
          <h2 className="font-bold text-dark">Linked Expenses</h2>
          <span className="text-xs font-jetbrains text-dark-panel/40">{expenses.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-border bg-warm/50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Title</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50 hidden sm:table-cell">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/50">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <Receipt className="h-8 w-8 text-dark-panel/20 mx-auto mb-2" />
                    <p className="text-sm text-dark-panel/40">No expenses linked to this budget</p>
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-brand/[0.03] transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-dark">{exp.title}</td>
                    <td className="px-5 py-4 text-sm font-jetbrains font-semibold text-dark">{formatCurrency(exp.amount)}</td>
                    <td className="px-5 py-4 hidden sm:table-cell"><CategoryBadge category={exp.category} /></td>
                    <td className="px-5 py-4 text-sm text-dark-panel/50 font-jetbrains hidden md:table-cell">{formatDate(exp.created_at)}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditExpense(exp)}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/10 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteExpenseTarget(exp)}
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
      <Modal open={editBudgetOpen} onClose={() => setEditBudgetOpen(false)} title="Edit Budget">
        <BudgetForm initial={budget ?? undefined} onSubmit={handleEditBudget} loading={editBudgetLoading} />
      </Modal>

      <ConfirmDeleteModal
        open={deleteBudgetOpen}
        onClose={() => setDeleteBudgetOpen(false)}
        onConfirm={handleDeleteBudget}
        itemName={budget.name}
        loading={deleteBudgetLoading}
      />

      <Modal
        open={!!editExpense}
        onClose={() => setEditExpense(undefined)}
        title="Edit Expense"
      >
        <ExpenseForm
          budgets={allBudgets}
          initial={editExpense}
          onSubmit={handleExpenseSubmit}
          loading={expenseFormLoading}
        />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteExpenseTarget}
        onClose={() => setDeleteExpenseTarget(null)}
        onConfirm={handleDeleteExpense}
        itemName={deleteExpenseTarget?.title ?? ''}
        loading={deleteExpenseLoading}
      />
    </div>
  );
}
