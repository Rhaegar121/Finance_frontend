import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction, MonthlyState } from '../types/types';

const baseURL = 'http://127.0.0.1:3000/transactions';

const initialState: MonthlyState = {
  income: [],
  expenses: [],
  isLoading: false,
  error: null,
};

export const fetchMonthlyData = createAsyncThunk(
    'monthly/fetchMonthlyData',
    async ({ month_year }: { month_year: string }) => {
        const response = await fetch(`${baseURL}/filter?month_year=${encodeURIComponent(month_year)}`);
        const data = await response.json();
        return data;
    },
);

export const fetchRangeData = createAsyncThunk(
    'monthly/fetchRangeData',
    async ({ start, end }: { start: string, end: string }) => {
        const response = await fetch(`${baseURL}/filter?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`);
        const data = await response.json();
        return data;
    },
);

export const addTransaction = createAsyncThunk(
    'monthly/addTransaction',
    async ({ transaction }: { transaction: Transaction }) => {
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });
        const data = await response.json();
        return data;
    },
);

export const updateTransaction = createAsyncThunk(
    'monthly/updateTransaction',
    async ({ transaction, id }: { transaction: Transaction, id: number }) => {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });
        const data = await response.json();
        return data;
    },
);

export const deleteTransaction = createAsyncThunk(
    'monthly/deleteTransaction',
    async (id: number) => {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    },
);

const monthlySlice = createSlice({
  name: 'monthly',
  initialState,
  reducers: {
    // Add a reducer to reset status after a certain time
    resetStatus: (state) => ({
      ...state,
      status: 'idle',
    }),
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchMonthlyData.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(fetchMonthlyData.fulfilled, (state, action) => ({
          ...state,
          isLoading: false,
          income: action.payload.income,
          expenses: action.payload.expenses,
        }))
        .addCase(fetchMonthlyData.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || '',
        }))
        .addCase(fetchRangeData.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(fetchRangeData.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            income: action.payload.income,
            expenses: action.payload.expenses,
        }))
        .addCase(fetchRangeData.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || '',
        }))
        .addCase(addTransaction.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(addTransaction.fulfilled, (state, action) => {
            const transaction = action.payload;
            if (transaction.income) {
                state.income.push(transaction);
            } else {
                state.expenses.push(transaction);
            }
            state.isLoading = false;
        })
        .addCase(addTransaction.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || '',
        }))
        .addCase(updateTransaction.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(updateTransaction.fulfilled, (state, action) => {
            const updatedTransaction = action.payload;
            const transactionList = updatedTransaction.income ? state.income : state.expenses;
            const index = transactionList.findIndex(t => t.id === updatedTransaction.id);
            if (index !== -1) {
                transactionList[index] = updatedTransaction;
            }
            state.isLoading = false;
        })
        .addCase(updateTransaction.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || '',
        }))
        .addCase(deleteTransaction.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(deleteTransaction.fulfilled, (state) => ({
            ...state,
            isLoading: false,
        }))
        .addCase(deleteTransaction.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || '',
        }))
  },
});

export const { resetStatus } = monthlySlice.actions;
export default monthlySlice.reducer;
