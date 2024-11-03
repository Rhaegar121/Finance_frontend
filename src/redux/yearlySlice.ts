import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { YearlyState } from '../types/types';

const baseURL = 'http://127.0.0.1:3000/transactions';

const initialState: YearlyState = {
  yearlyData: {
    income: [],
    expenses: [],
  },
  categoryData: {
      income: [],
      expenses: [],
  },
  isLoading: false,
  error: null,
};

export const fetchYearlyData = createAsyncThunk(
    'yearly/fetchYearlyData',
    async () => {
        const response = await fetch(`${baseURL}/yearly_summary`);
        const data = await response.json();
        return data;
    },
);

export const fetchYearlyRangeData = createAsyncThunk(
    'yearly/fetchYearlyRangeData',
    async ({ start, end }: { start: string, end: string }) => {
        const response = await fetch(`${baseURL}/yearly_summary?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`);
        const data = await response.json();
        return data;
    },
);

export const fetchCategoryData = createAsyncThunk(
    'yearly/fetchCategoryData',
    async ({ categories }: { categories: string[] }) => {
        const queryParams = categories.map(category => `categories[]=${encodeURIComponent(category)}`).join('&');
        const response = await fetch(`${baseURL}/yearly_summary?${queryParams}`);
        const data = await response.json();
        return data;
    },
);

const YearlySlice = createSlice({
    name: 'yearly',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchYearlyData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        });
    
        builder.addCase(fetchYearlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.yearlyData = action.payload;
        });
    
        builder.addCase(fetchYearlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        });

        builder.addCase(fetchYearlyRangeData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
    
        builder.addCase(fetchYearlyRangeData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.yearlyData = action.payload;
        });
    
        builder.addCase(fetchYearlyRangeData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(fetchCategoryData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
    
        builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.yearlyData = action.payload;
        });
    
        builder.addCase(fetchCategoryData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export default YearlySlice.reducer;