import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, TrendingUp, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Budget, BudgetSummary } from '@/types';
import { budgetApi, expenseApi } from '@/api';
import { formatCurrency } from '@/utils/format';
import CategoryBadge from '@/components/CategoryBadge';
import BudgetProgressBar from '@/components/BudgetProgressBar';
import Modal from '@/components/Modal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import BudgetForm from '@/components/BudgetForm';
import { CardSkeleton } from '@/components/Skeleton';

export default function Budgets() {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [summaries, setSummaries] = useState<Record<number, BudgetSummary>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editBudget, setEditBudget] = useState<Budget | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Budget | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [budList, allExpenses] = await Promise.all([
        budgetApi.getAll(),
        expenseApi.getAll()
      ]);
      setBudgets(budList);

      // Calculate summaries dynamically instead of relying on stale backend data
      const sumMap: Record<number, BudgetSummary> = {};
      const now = new Date();
      budList.forEach((b) => {
        const budgetExpenses = allExpenses.filter(e => 
          e.budget_id === b.id && 
          new Date(e.created_at).getMonth() === now.getMonth() &&
          new Date(e.created_at).getFullYear() === now.getFullYear()
        );
        const total_spent = budgetExpenses.reduce((sum, e) => sum + e.amount, 0);
        const percent_used = b.monthly_limit > 0 ? (total_spent / b.monthly_limit) * 100 : 0;
        sumMap[b.id] = {
          budget_name: b.name,
          category: b.category,
          total_spent,
          percent_used,
          remaining: b.monthly_limit - total_spent,
          monthly_limit: b.monthly_limit
        };
      });
      setSummaries(sumMap);
    } catch {
      toast.error('Failed to load budgets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = () => { setEditBudget(undefined); setModalOpen(true); };
  const handleEdit = (e: React.MouseEvent, budget: Budget) => { e.stopPropagation(); setEditBudget(budget); setModalOpen(true); };
  const handleDeleteClick = (e: React.MouseEvent, budget: Budget) => { e.stopPropagation(); setDeleteTarget(budget); };

  const handleFormSubmit = async (data: { name: string; category: Budget['category']; monthly_limit: number }) => {
    setFormLoading(true);
    try {
      if (editBudget) {
        await budgetApi.update(editBudget.id, data);
        toast.success('Budget updated');
      } else {
        await budgetApi.create(data);
        toast.success('Budget created');
      }
      setModalOpen(false);
      setEditBudget(undefined);
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
      await budgetApi.delete(deleteTarget.id);
      toast.success('Budget deleted');
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">Budgets</h1>
          <p className="text-sm text-dark-panel/50 mt-1">Manage your monthly budget allocations</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 gradient-brand rounded-xl px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-all glow-brand-sm w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" /> New Budget
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-warm mb-4">
            <TrendingUp className="h-10 w-10 text-dark-panel/20" />
          </div>
          <p className="text-lg font-semibold text-dark-panel/40 mb-2">No budgets yet</p>
          <p className="text-sm text-dark-panel/30 mb-4">Create your first budget to start tracking</p>
          <button
            onClick={handleAdd}
            className="text-sm font-bold text-brand hover:text-brand-dark transition-colors"
          >
            + Create a budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {budgets.map((budget, i) => {
            const summary = summaries[budget.id];
            const percent = Number(summary?.percent_used ?? 0);
            const statusColor = percent >= 90 ? 'text-red-500' : percent >= 70 ? 'text-amber-500' : 'text-brand';

            return (
              <div
                key={budget.id}
                onClick={() => navigate(`/budgets/${budget.id}`)}
                className={`animate-slide-up stagger-${Math.min(i + 1, 6)} group cursor-pointer rounded-2xl border border-warm-border bg-white p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/20 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:bg-brand/10 transition-all" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-dark text-lg">{budget.name}</h3>
                      <div className="mt-1"><CategoryBadge category={budget.category} size="sm" /></div>
                    </div>
                    <div className="flex gap-0.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEdit(e, budget)}
                        className="p-1.5 rounded-lg hover:bg-brand/10 text-brand transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(e, budget)}
                        className="p-1.5 rounded-lg hover:bg-danger/10 text-danger transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <p className="text-xs text-dark-panel/40 font-medium">Monthly Limit</p>
                      <p className="font-jetbrains text-xl font-bold text-dark">{formatCurrency(Number(budget.monthly_limit))}</p>
                    </div>
                    <span className={`font-jetbrains text-sm font-bold ${statusColor}`}>
                      {percent.toFixed(0)}%
                    </span>
                  </div>

                  <BudgetProgressBar percent={percent} size="md" />

                  <div className="flex items-center justify-between mt-4 text-xs text-dark-panel/40">
                    <span>
                      {summary ? `${formatCurrency(Number(summary.total_spent))} spent` : '—'}
                    </span>
                    <span className="flex items-center gap-1 text-brand font-semibold group-hover:gap-2 transition-all">
                      View <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditBudget(undefined); }}
        title={editBudget ? 'Edit Budget' : 'New Budget'}
      >
        <BudgetForm initial={editBudget} onSubmit={handleFormSubmit} loading={formLoading} />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name ?? ''}
        loading={deleteLoading}
      />
    </div>
  );
}
