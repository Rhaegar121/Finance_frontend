import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SearchState } from '../types/types';

const baseURL = 'http://127.0.0.1:3000/transactions';

const initialState: SearchState = {
  income: [],
  expenses: [],
  isLoading: false,
  error: null,
};

export const searchByDate = createAsyncThunk(
    'monthly/searchTransactions',
    async ({ date }: { date: string }) => {
        const response = await fetch(`${baseURL}/search?date=${encodeURIComponent(date)}`);
        const data = await response.json();
        return data;
    },
);

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchByDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        });
    
        builder.addCase(searchByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = action.payload.income;
        state.expenses = action.payload.expenses;
        });
    
        builder.addCase(searchByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        });
    },
});

export default SearchSlice.reducer;