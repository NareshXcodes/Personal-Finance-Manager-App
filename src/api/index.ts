import type { Budget, Expense, BudgetSummary, MonthlyReport } from '@/types';
import { axiosInstance as api } from './axiosInstance';

export const budgetApi = {
  getAll: (): Promise<Budget[]> => api.get<Budget[]>('/budgets/').then(r => r.data.map(b => ({ ...b, monthly_limit: Number(b.monthly_limit) }))),
  getById: (id: number): Promise<Budget> => api.get<Budget>(`/budgets/${id}`).then(r => ({ ...r.data, monthly_limit: Number(r.data.monthly_limit) })),
  create: (budget: Omit<Budget, 'id' | 'created_at'>): Promise<Budget> => api.post<Budget>('/budgets/', budget).then(r => ({ ...r.data, monthly_limit: Number(r.data.monthly_limit) })),
  update: (id: number, budget: Partial<Omit<Budget, 'id' | 'created_at'>>): Promise<Budget> => api.put<Budget>(`/budgets/${id}`, budget).then(r => ({ ...r.data, monthly_limit: Number(r.data.monthly_limit) })),
  delete: (id: number): Promise<void> => api.delete(`/budgets/${id}`).then(() => {}),
  getSummary: (id: number): Promise<BudgetSummary> => api.get<BudgetSummary>(`/budgets/${id}/summary`).then(r => ({ ...r.data, monthly_limit: Number(r.data.monthly_limit), total_spent: Number(r.data.total_spent), remaining: Number(r.data.remaining), percent_used: Number(r.data.percent_used) })),
  getExpenses: (id: number): Promise<Expense[]> => api.get<Expense[]>(`/budgets/${id}/expenses`).then(r => r.data.map(e => ({ ...e, amount: Number(e.amount) }))),
};

export const expenseApi = {
  getAll: (filters?: Record<string, string>): Promise<Expense[]> => api.get<Expense[]>('/expenses/', { params: filters }).then(r => r.data.map(e => ({ ...e, amount: Number(e.amount) }))),
  getById: (id: number): Promise<Expense> => api.get<Expense>(`/expenses/${id}`).then(r => ({ ...r.data, amount: Number(r.data.amount) })),
  create: (expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> => api.post<Expense>('/expenses/', expense).then(r => ({ ...r.data, amount: Number(r.data.amount) })),
  update: (id: number, expense: Partial<Omit<Expense, 'id' | 'created_at'>>): Promise<Expense> => api.put<Expense>(`/expenses/${id}`, expense).then(r => ({ ...r.data, amount: Number(r.data.amount) })),
  delete: (id: number): Promise<void> => api.delete(`/expenses/${id}`).then(() => {}),
  getMonthlyReport: (): Promise<MonthlyReport[]> => api.get<MonthlyReport[]>('/expenses/report/monthly').then(r => r.data.map(m => ({ ...m, total: Number(m.total) }))),
};
