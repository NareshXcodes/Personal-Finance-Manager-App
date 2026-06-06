import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';
import type { MonthlyReport } from '@/types';
import { expenseApi } from '@/api';
import { formatCurrency } from '@/utils/format';
import { Skeleton } from '@/components/Skeleton';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const BAR_COLORS: Record<string, string> = {
  food: '#F97316',
  transport: '#3B82F6',
  utilities: '#8B5CF6',
  entertainment: '#EC4899',
  health: '#10B981',
  education: '#6366F1',
  shopping: '#E11D48',
};

const TOTAL_BUDGET = 50000; // reference for on-track status

export default function Reports() {
  const [report, setReport] = useState<MonthlyReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await expenseApi.getMonthlyReport();
        setReport(data);
      } catch {
        toast.error('Failed to load report');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const grandTotal = report.reduce((s, r) => s + r.total, 0);
  const avgSpend = report.length > 0 ? grandTotal / report.length : 0;

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-dark tracking-tight">Monthly Report</h1>
        <p className="text-sm text-dark-panel/50 mt-1">Breakdown of your spending by category</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-60 w-full rounded-2xl" />
        </div>
      ) : report.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-warm mb-4">
            <BarChart3 className="h-10 w-10 text-dark-panel/20" />
          </div>
          <p className="text-lg font-semibold text-dark-panel/40 mb-2">No data yet</p>
          <p className="text-sm text-dark-panel/30">Add some expenses to see your report</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up stagger-1">
            <div className="rounded-2xl gradient-brand p-5 glow-brand-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">Grand Total</p>
              <p className="font-jetbrains text-2xl font-bold text-white mt-1">{formatCurrency(grandTotal)}</p>
            </div>
            <div className="rounded-2xl dark-panel border border-white/5 p-5 noise-bg">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">Categories</p>
              <p className="font-jetbrains text-2xl font-bold text-white mt-1">{report.length}</p>
            </div>
            <div className="rounded-2xl border border-warm-border bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-dark-panel/50">Average / Category</p>
              <p className="font-jetbrains text-2xl font-bold text-dark mt-1">{formatCurrency(avgSpend)}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-warm-border bg-white p-6 shadow-sm animate-slide-up stagger-2">
            <h2 className="font-bold text-dark mb-6">Spending by Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={report} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DD" vertical={false} />
                  <XAxis
                    dataKey="category"
                    tick={{ fill: '#1A1F2E', fontSize: 13, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: string) => v.charAt(0).toUpperCase() + v.slice(1)}
                  />
                  <YAxis
                    tick={{ fill: '#1A1F2E66', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Spent']}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E8E5DD',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                    }}
                    cursor={{ fill: 'rgba(13,148,136,0.05)' }}
                  />
                  <Bar dataKey="total" radius={[8, 8, 0, 0] as unknown as number} maxBarSize={64}>
                    {report.map((entry) => (
                      <Cell
                        key={entry.category}
                        fill={BAR_COLORS[entry.category] || '#0D9488'}
                        radius={[8, 8, 0, 0] as unknown as number}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Table */}
          <div className="rounded-2xl border border-warm-border bg-white overflow-hidden shadow-sm animate-slide-up stagger-3">
            <div className="px-6 py-4 border-b border-warm-border">
              <h2 className="font-bold text-dark">Category Summary</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-border bg-warm/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-panel/50">% of Total</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-panel/50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border/50">
                  {report.map((row) => {
                    const pct = grandTotal > 0 ? (row.total / grandTotal) * 100 : 0;
                    const perBudgetPct = TOTAL_BUDGET > 0 ? (row.total / (TOTAL_BUDGET / report.length)) * 100 : 0;
                    const isOverBudget = perBudgetPct > 100;
                    const color = BAR_COLORS[row.category] || '#0D9488';

                    return (
                      <tr key={row.category} className="hover:bg-brand/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-sm font-semibold text-dark capitalize">{row.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-jetbrains text-sm font-semibold text-dark">{formatCurrency(row.total)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 rounded-full bg-dark-panel/5">
                              <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }} />
                            </div>
                            <span className="text-xs font-jetbrains text-dark-panel/50">{pct.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isOverBudget ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">
                              <TrendingUp className="h-3 w-3" /> Over Budget
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                              <TrendingDown className="h-3 w-3" /> On Track
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
