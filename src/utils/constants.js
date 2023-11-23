export const DRAWER_WIDTH = 240;
export const DRAWER_WIDTH_CLOSED = 55;
export const VERSION = process.env.VERSION;

export const DEFAULT_TABLE_SORT_MODEL = [];
export const DEFAULT_TABLE_PAGINATION_MODEL = {
  page: 0,
  pageSize: 5
};
export const DEFAULT_TABLE_FILTERS_MODEL = {
  items: [],
  logisticOperator: 'and',
  quickFilterLogicOperator: 'and',
  quickFilterValues: []
};

export const API = {
  TRANSPORTES: `${process.env.API_URL}/transportes`,
};

export const TABLE_COLUMNS = {
  TRANSPORTES: [
    { field: 'id', headerName: 'ID' },
    { field: 'nombre', headerName: 'Nombre', minWidth: 170, flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 170, flex: 1  },
    { field: 'fecha_creacion', headerName: 'Fecha de Creación', minWidth: 170, flex: 1  },
  ]
};