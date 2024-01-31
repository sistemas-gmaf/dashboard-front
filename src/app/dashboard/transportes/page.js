import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function TransportesPage() {
  return (
    <Box>
      <Typography variant='h5'>Transportes</Typography>
      <Table
        url={API.TRANSPORTES}
        columns={TABLE_COLUMNS.TRANSPORTES}
        section={'transportes'}
        createRoute={'/dashboard/transportes/crear'}
        detailRoute={'/dashboard/transportes/detalle'}
        editRoute={'/dashboard/transportes/editar'}
        createPermission={'CREAR_TRANSPORTE'}
        editPermission={'EDITAR_TRANSPORTE'}
        deletePermission={'ELIMINAR_TRANSPORTE'}
      />
    </Box>
  );
}