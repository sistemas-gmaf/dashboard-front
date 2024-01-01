'use client'
import { getFromStorage } from "@/utils/getFromStorage";
import { createSlice } from "@reduxjs/toolkit";

export const SliceSideMenu = createSlice({
  name: 'sidemenu',
  initialState: {
    open: getFromStorage("sidemenu.open")
  },
  reducers: {
    toggleSideMenuState: (state) => {
      localStorage.setItem('sidemenu.open', !state.open);
      state.open = !state.open;
    },
  }
});

export const { toggleSideMenuState } = SliceSideMenu.actions;