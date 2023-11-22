'use client'
import { DEFAULT_TABLE_PAGINATION_MODEL, DEFAULT_TABLE_SORT_MODEL } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export const SliceTables = createSlice({
  name: 'tables',
  initialState: {
    transportes: {
      paginationModel: DEFAULT_TABLE_PAGINATION_MODEL,
      sortModel: DEFAULT_TABLE_SORT_MODEL,
    },
  },
  reducers: {
    setPaginationModelState: (state, { payload: { section, model } }) => {
      state[section].paginationModel = model;
    },
    setSortModelState: (state, { payload: { section, model } }) => {
      state[section].sortModel = model;
    },
  }
});

export const { setPaginationModelState, setSortModelState } = SliceTables.actions;