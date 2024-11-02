import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/transactions';

const initialState = {
  data: [],
  status: 'idle',
  isLoading: true,
  error: '',
};

export const fetchMonthlyData = createAsyncThunk(
    'monthly/fetchMonthlyData',
    async ({ month_year }: { month_year: string }) => {
        const response = await fetch(`${baseURL}/by_month?month_year=${encodeURIComponent(month_year)}`);
        const data = await response.json();
        return data;
    },
);

// export const addCar = createAsyncThunk(
//   'car/addCar',
//   async ({ userId, car }) => {
//     const response = await fetch(`${baseURL}/users/${userId}/monthly`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(car),
//     });
//     const data = await response.json();
//     return data;
//   },
// );

// export const deleteCar = createAsyncThunk(
//   'car/deleteCar',
//   async ({ userId, carId }) => {
//     await fetch(`${baseURL}/users/${userId}/monthly/${carId}`, {
//       method: 'DELETE',
//     });
//     return carId;
//   },
// );

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
          monthly: action.payload,
        }))
        .addCase(fetchMonthlyData.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || '',
        }));
  },
});

export const { resetStatus } = monthlySlice.actions;
export default monthlySlice.reducer;