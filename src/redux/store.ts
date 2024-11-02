import { configureStore } from '@reduxjs/toolkit';
import monthlyReducer from './monthlySlice';

export const store = configureStore({
  reducer: {
    monthly: monthlyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
