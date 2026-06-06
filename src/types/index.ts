export type Category = 'food' | 'transport' | 'utilities' | 'entertainment' | 'health' | 'education' | 'shopping';

export interface Budget {
  id: number;
  name: string;
  category: Category;
  monthly_limit: number;
  created_at: string;
}

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
  budget_id: number;
  created_at: string;
}

export interface BudgetSummary {
  budget_name: string;
  category: Category;
  monthly_limit: number;
  total_spent: number;
  remaining: number;
  percent_used: number;
}

export interface MonthlyReport {
  category: string;
  total: number;
}
