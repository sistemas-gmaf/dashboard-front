'use client'
import { getFromStorage } from "@/utils/getFromStorage";
import { createSlice } from "@reduxjs/toolkit";

export const SliceUser = createSlice({
  name: 'user',
  initialState: {
    data: getFromStorage('user.data') || {}
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
      localStorage.setItem('user.data', JSON.stringify(payload));
    },
    clearUserData: (state) => {
      state.data = {};
      localStorage.removeItem('user.data');
    }
  }
});

export const { setUserData, clearUserData } = SliceUser.actions;