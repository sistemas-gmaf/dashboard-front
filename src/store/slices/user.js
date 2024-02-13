'use client'
import { getFromStorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

let authorization = '';

if (typeof window !== 'undefined') { 
  authorization = localStorage.getItem('authorization');
}

export const SliceUser = createSlice({
  name: 'user',
  initialState: {
    data: getFromStorage('user.data') || {},
    authorization,
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user.data', JSON.stringify(payload));
      }
    },
    clearUserData: (state) => {
      state.data = {};
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user.data');
      }
    },
    setPermisos: (state, { payload }) => {
      state.data.permisos = payload;
    },
    setAuthorization: (state, { payload }) => {
      state.authorization = payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authorization', payload);
      }
    },
    clearAuthorization: (state) => {
      state.authorization = '';
    }
  }
});

export const { setUserData, clearUserData, setPermisos, setAuthorization, clearAuthorization } = SliceUser.actions;