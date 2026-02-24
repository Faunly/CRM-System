import { createSlice } from '@reduxjs/toolkit';

const initialState = { isFetching: false, isAuth: false, isInit: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
      state.isInit = true
    },
    setIsInit(state, action) {
      state.isInit = action.payload
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
