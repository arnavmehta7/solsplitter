export interface Group {
  id: string;
  name: string;
  members: string[];
  expenses: Expense[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  splitType: 'equal' | 'byPercentage' | 'custom';
}