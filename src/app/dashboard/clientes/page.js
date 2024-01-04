import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function ClientesPage() {
  return (
    <Box>
      <Typography variant='h5'>Clientes</Typography>
      <Table
        url={API.CLIENTES}
        columns={TABLE_COLUMNS.CLIENTES}
        section={'clientes'}
        createRoute={'/dashboard/clientes/crear'}
        detailRoute={'/dashboard/clientes/detalle'}
        editRoute={'/dashboard/clientes/editar'}
      />
    </Box>
  );
}