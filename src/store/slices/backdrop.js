'use client'
import { createSlice } from "@reduxjs/toolkit";

export const SliceBackdrop = createSlice({
  name: 'backdrop',
  initialState: {
    open: false,
  },
  reducers: {
    setBackdropState: (state, { payload }) => {
      state.open = payload;
    },
  }
});

export const { setBackdropState } = SliceBackdrop.actions;