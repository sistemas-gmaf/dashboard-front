'use client'
import { getFromStorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

export const SliceUser = createSlice({
  name: 'user',
  initialState: {
    data: getFromStorage('user.data') || {},
    authorization: localStorage?.getItem('authorization') || '',
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
      localStorage.setItem('user.data', JSON.stringify(payload));
    },
    clearUserData: (state) => {
      state.data = {};
      localStorage.removeItem('user.data');
    },
    setPermisos: (state, { payload }) => {
      state.data.permisos = payload;
    },
    setAuthorization: (state, { payload }) => {
      state.authorization = payload;
      localStorage.setItem('authorization', payload);
    },
    clearAuthorization: (state) => {
      state.authorization = '';
    }
  }
});

export const { setUserData, clearUserData, setPermisos, setAuthorization, clearAuthorization } = SliceUser.actions;