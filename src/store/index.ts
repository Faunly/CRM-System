import { configureStore } from '@reduxjs/toolkit';
import uiSliceReducer from './slices/ui-slice';

const store = configureStore({
  reducer: { ui: uiSliceReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
