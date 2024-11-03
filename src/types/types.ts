export interface Transaction {
    id?: number;
    amount?: number;
    date?: string;
    description?: string;
    category?: string;
    income?: boolean;
    created_at?: string;
    updated_at?: string;
}
  
export interface MonthlyState {
  income: Transaction[];
  expenses: Transaction[];
  isLoading: boolean;
  error: string | null;
}

export interface YearlyState {
    yearlyData: {
        income: Transaction[];
        expenses: Transaction[];
    }
    categoryData: {
        income: Transaction[];
        expenses: Transaction[];
    }
    isLoading: boolean;
    error: string | null;
}

export interface SearchState {
    income: Transaction[];
    expenses: Transaction[];
    isLoading: boolean;
    error: string | null;
}

export interface FetchDataParams {
    month_year: string;
}

export interface FetchRangeDataParams {
    start: string;
    end: string;
}