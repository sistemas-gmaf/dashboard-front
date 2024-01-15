'use client'
import { DEFAULT_TABLE_PAGINATION_MODEL, DEFAULT_TABLE_SORT_MODEL } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const defaultValues = {
  paginationModel: DEFAULT_TABLE_PAGINATION_MODEL,
  sortModel: DEFAULT_TABLE_SORT_MODEL,
};

export const SliceTables = createSlice({
  name: 'tables',
  initialState: {
    transportes: defaultValues,
    vehiculos: defaultValues,
    choferes: defaultValues,
    clientes: defaultValues,
    recordatorios: defaultValues,
    compromisos: defaultValues,
    cheques: defaultValues,
    'tarifario-clientes': defaultValues,
    'tarifario-transportes': defaultValues,
    'tarifario-transportes-especiales': defaultValues,
    'tarifario-viajes-especiales': defaultValues,
    viajes: defaultValues,
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