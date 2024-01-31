import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function ChequesPage() {
  return (
    <Box>
      <Typography variant='h5'>Gestión de Usuarios</Typography>
      <Table
        url={API.USUARIOS}
        columns={TABLE_COLUMNS.USUARIOS}
        section={'usuarios'}
        createRoute={'/dashboard/usuarios/crear'}
        detailRoute={'/dashboard/usuarios/detalle'}
        editRoute={'/dashboard/usuarios/editar'}
        createPermission={'CREAR_USUARIO'}
        editPermission={'EDITAR_USUARIO'}
        deletePermission={'ELIMINAR_USUARIO'}
      />
    </Box>
  );
}