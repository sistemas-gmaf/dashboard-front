'use client'
import { createSlice } from "@reduxjs/toolkit";

export const SliceSideMenu = createSlice({
  name: 'sidemenu',
  initialState: {
    open: false,
  },
  reducers: {
    toggleSideMenuState: (state) => {
      state.open = !state.open;
    },
  }
});

export const { toggleSideMenuState } = SliceSideMenu.actions;