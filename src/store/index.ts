import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from './ui-slice'
import authSliceReducer from './auth-slice'

const store = configureStore({
  reducer: { ui: uiSliceReducer, auth: authSliceReducer}
})

export default store

