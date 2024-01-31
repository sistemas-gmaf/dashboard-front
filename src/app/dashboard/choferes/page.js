import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function ChoferesPage() {
  return (
    <Box>
      <Typography variant='h5'>Choferes</Typography>
      <Table
        url={API.CHOFERES}
        columns={TABLE_COLUMNS.CHOFERES}
        section={'choferes'}
        createRoute={'/dashboard/choferes/crear'}
        detailRoute={'/dashboard/choferes/detalle'}
        editRoute={'/dashboard/choferes/editar'}
        createPermission={'CREAR_CHOFER'}
        editPermission={'EDITAR_CHOFER'}
        deletePermission={'ELIMINAR_CHOFER'}
      />
    </Box>
  );
}