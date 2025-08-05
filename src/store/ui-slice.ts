import { createSlice } from "@reduxjs/toolkit";

const initialState = { isFetching: false }

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleIsFetching(state) {
      state.isFetching = !state.isFetching
    }
  }
})
