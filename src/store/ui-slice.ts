import { createSlice } from "@reduxjs/toolkit";

const initialState = { isFetching: false }

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setIsFetching(state, action) {
      state.isFetching = action.payload
    }
  }
})

export default uiSlice.reducer
export const uiActions = uiSlice.actions
