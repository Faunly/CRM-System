import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './slices/auth-slice';

const store = configureStore({
  reducer: { auth: authSliceReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
