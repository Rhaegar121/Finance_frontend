import { configureStore } from '@reduxjs/toolkit';
import monthlyReducer from './monthlySlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    monthly: monthlyReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
