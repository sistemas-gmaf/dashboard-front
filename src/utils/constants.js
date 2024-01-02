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
  LOGIN: `${process.env.API_URL}/auth/login`,
  LOGOUT: `${process.env.API_URL}/auth/logout`,
  PERFIL: `${process.env.API_URL}/perfil`,
  TRANSPORTES: `${process.env.API_URL}/transportes`,
  VEHICULOS: `${process.env.API_URL}/vehiculos`,
  CHOFERES: `${process.env.API_URL}/choferes`,
  VEHICULOS_TIPOS: `${process.env.API_URL}/vehiculos-tipos`,
};

export const TABLE_COLUMNS = {
  TRANSPORTES: [
    { field: 'id', headerName: 'ID' },
    { field: 'nombre', headerName: 'Nombre', minWidth: 170, flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 170, flex: 1  },
    { field: 'fecha_creacion', headerName: 'Fecha de Creación', minWidth: 170, flex: 1  },
  ],
  VEHICULOS: [
    { field: 'id', headerName: 'ID' },
    { field: 'chofer_nombre', headerName: 'Chofer', minWidth: 170, flex: 1 },
    { field: 'vehiculo_patente', headerName: 'Patente', minWidth: 80, flex: 1  },
    { field: 'vehiculo_tipo_descripcion', headerName: 'Tipo de Vehículo', minWidth: 150, flex: 1  },
    { field: 'transporte_nombre', headerName: 'Transporte', minWidth: 170, flex: 1  },
  ],
  CHOFERES: [
    { field: 'id', headerName: 'ID' },
    { field: 'nombre', headerName: 'Chofer', minWidth: 170, flex: 1 },
    { field: 'dni', headerName: 'DNI', minWidth: 170, flex: 1 },
    { field: 'celular', headerName: 'Celular', minWidth: 100, flex: 1  },
    { field: 'correo', headerName: 'Email', minWidth: 150, flex: 1  },
  ]
};