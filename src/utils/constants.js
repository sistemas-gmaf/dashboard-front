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
  CLIENTES: `${process.env.API_URL}/clientes`,
  RECORDATORIOS: `${process.env.API_URL}/recordatorios`,
  COMPROMISOS: `${process.env.API_URL}/compromisos`,
  COMPROMISOS_CATEGORIAS: `${process.env.API_URL}/compromisos-categorias`,
  COMPROMISOS_RAZONES_SOCIALES: `${process.env.API_URL}/compromisos-razones-sociales`,
  COMPROMISOS_REFERENCIAS: `${process.env.API_URL}/compromisos-referencias`,
  COMPROMISOS_ESTADOS: `${process.env.API_URL}/compromisos-estados`,
  CHEQUES: `${process.env.API_URL}/cheques`,
  CHEQUES_BANCOS: `${process.env.API_URL}/cheques-bancos`,
  CHEQUES_REFERENCIAS: `${process.env.API_URL}/cheques-referencias`,
  CHEQUES_PROVEEDORES: `${process.env.API_URL}/cheques-proveedores`,
  CHEQUES_ESTADOS: `${process.env.API_URL}/cheques-estados`,
  VIAJES: `${process.env.API_URL}/viajes`,
  TARIFARIO_CLIENTES: `${process.env.API_URL}/tarifario-clientes`,
  TARIFARIO_TRANSPORTES: `${process.env.API_URL}/tarifario-transportes`,
  TARIFARIO_TRANSPORTES_ESPECIALES: `${process.env.API_URL}/tarifario-transportes-especiales`,
  TARIFARIO_VIAJES_ESPECIALES: `${process.env.API_URL}/tarifario-viajes-especiales`,
  ZONAS: `${process.env.API_URL}/zonas`,
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
  ],
  CLIENTES: [
    { field: 'id', headerName: 'ID' },
    { field: 'cuit', headerName: 'Cuit', minWidth: 170, flex: 1 },
    { field: 'razon_social', headerName: 'Razón Social', minWidth: 170, flex: 1 },
    { field: 'abreviacion_razon_social', headerName: 'Abreviacion RS', minWidth: 100, flex: 1  },
    { field: 'correo', headerName: 'Email', minWidth: 150, flex: 1  },
  ],
  RECORDATORIOS: [
    { field: 'id', headerName: 'ID' },
    { field: 'titulo', headerName: 'Titulo', minWidth: 170, flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', minWidth: 170, flex: 1 },
    { field: 'fecha_limite_formateada', headerName: 'Fecha Limite', minWidth: 170, flex: 1  },
    { field: 'cantidad_dias_aviso', headerName: 'Dias de Aviso', minWidth: 120, flex: 1  },
  ],
  COMPROMISOS: [
    { field: 'id', headerName: 'ID' },
    { field: 'categoria', headerName: 'Categoria', minWidth: 170, flex: 1 },
    { field: 'razon_social', headerName: 'Razon Social', minWidth: 170, flex: 1 },
    { field: 'referencia', headerName: 'Referencia', minWidth: 170, flex: 1  },
    { field: 'fecha_formateada', headerName: 'Fecha', minWidth: 120, flex: 1  },
    { field: 'estado', headerName: 'Estado', minWidth: 120, flex: 1  },
  ],
  CHEQUES: [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'fecha_emision_formateada', headerName: 'Fecha de Emision', minWidth: 150, flex: 1 },
    { field: 'fecha_pago_formateada', headerName: 'Fecha de Pago', minWidth: 150, flex: 1 },
    { field: 'numero', headerName: 'Numero', minWidth: 100, flex: 1  },
    { field: 'banco', headerName: 'Banco', minWidth: 120, flex: 1  },
    { field: 'importe_formateado', headerName: 'Importe', minWidth: 100, flex: 1  },
    { field: 'referencia', headerName: 'Referencia', minWidth: 120, flex: 1  },
    { field: 'proveedor', headerName: 'Proveedor', minWidth: 120, flex: 1  },
    { field: 'estado', headerName: 'Estado', minWidth: 80, flex: 1  },
  ],
  TARIFARIO_CLIENTES: [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'vehiculo_tipo', headerName: 'Tipo Vehiculo', minWidth: 120, flex: 1 },
    { field: 'abreviacion_razon_social_cliente', headerName: 'Cliente', minWidth: 150, flex: 1 },
    { field: 'zona', headerName: 'Zona', minWidth: 120, flex: 1 },
    { field: 'monto_formateado', headerName: 'Monto', minWidth: 120, flex: 1 },
    { field: 'monto_por_ayudante_formateado', headerName: 'Monto Por Ayudante', minWidth: 150, flex: 1 },
    { field: 'fecha_desde_formateada', headerName: 'Fecha Vigencia Desde', minWidth: 170, flex: 1 },
    { field: 'fecha_hasta_formateada', headerName: 'Fecha Vigencia Hasta', minWidth: 170, flex: 1 },
  ],
  TARIFARIO_TRANSPORTES: [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'vehiculo_tipo', headerName: 'Tipo Vehiculo', minWidth: 120, flex: 1 },
    { field: 'zona', headerName: 'Zona', minWidth: 120, flex: 1 },
    { field: 'monto_formateado', headerName: 'Monto', minWidth: 120, flex: 1 },
    { field: 'monto_por_ayudante_formateado', headerName: 'Monto Por Ayudante', minWidth: 150, flex: 1 },
    { field: 'fecha_desde_formateada', headerName: 'Fecha Vigencia Desde', minWidth: 170, flex: 1 },
    { field: 'fecha_hasta_formateada', headerName: 'Fecha Vigencia Hasta', minWidth: 170, flex: 1 },
  ],
  TARIFARIO_TRANSPORTES_ESPECIALES: [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'vehiculo_tipo', headerName: 'Tipo Vehiculo', minWidth: 120, flex: 1 },
    { field: 'transporte', headerName: 'Transporte', minWidth: 150, flex: 1 },
    { field: 'zona', headerName: 'Zona', minWidth: 120, flex: 1 },
    { field: 'monto_formateado', headerName: 'Monto', minWidth: 120, flex: 1 },
    { field: 'monto_por_ayudante_formateado', headerName: 'Monto Por Ayudante', minWidth: 150, flex: 1 },
    { field: 'fecha_desde_formateada', headerName: 'Fecha Vigencia Desde', minWidth: 170, flex: 1 },
    { field: 'fecha_hasta_formateada', headerName: 'Fecha Vigencia Hasta', minWidth: 170, flex: 1 },
  ],
  TARIFARIO_VIAJES_ESPECIALES: [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'id_viaje', headerName: 'ID Viaje', minWidth: 100, flex: 1 },
    { field: 'fecha_salida_formateada', headerName: 'Fecha Salida', minWidth: 120, flex: 1 },
    { field: 'chofer', headerName: 'Chofer', minWidth: 150, flex: 1 },
    { field: 'vehiculo_tipo', headerName: 'Tipo de Vehiculo', minWidth: 150, flex: 1 },
    { field: 'zona', headerName: 'Zona', minWidth: 120, flex: 1 },
    { field: 'cliente', headerName: 'Cliente', minWidth: 120, flex: 1 },
    { field: 'transporte', headerName: 'Transporte', minWidth: 120, flex: 1 },
    { field: 'estado', headerName: 'Estado', minWidth: 120, flex: 1 },
  ],
  VIAJES: [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'fecha_salida_formateada', headerName: 'Fecha de Salida', minWidth: 140, flex: 1 },
    { field: 'cliente', headerName: 'Cliente', minWidth: 170, flex: 1 },
    { field: 'chofer', headerName: 'Chofer', minWidth: 150, flex: 1 },
    { field: 'vehiculo_tipo', headerName: 'Tipo de Vehiculo', minWidth: 150, flex: 1 },
    { field: 'zona', headerName: 'Zona', minWidth: 90, flex: 1 },
    { field: 'estado', headerName: 'Estado', minWidth: 120, flex: 1 },
  ],
};