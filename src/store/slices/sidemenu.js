'use client'
import { createSlice } from "@reduxjs/toolkit";

export const SliceSideMenu = createSlice({
  name: 'sidemenu',
  initialState: {
    open: false
  },
  reducers: {
    toggleSideMenuState: (state) => {
      localStorage.setItem('sidemenu.open', !state.open);
      state.open = !state.open;
    },
    setSideMenuState: (state, { payload }) => {
      state.open = payload;
    }
  }
});

export const { toggleSideMenuState, setSideMenuState } = SliceSideMenu.actions;