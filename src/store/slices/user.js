'use client'
import { createSlice } from "@reduxjs/toolkit";

let initialData = {};

if (typeof localStorage !== 'undefined') {
  initialData = JSON.parse(localStorage.getItem('user.data'));
}

export const SliceUser = createSlice({
  name: 'user',
  initialState: {
    data: initialData
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