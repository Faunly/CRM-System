import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuth: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authLogin(state) {
      state.isAuth = true;
    },
    authLogout(state) {
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
