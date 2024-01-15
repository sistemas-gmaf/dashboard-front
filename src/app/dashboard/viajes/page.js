import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function ViajesPage() {
  return (
    <Box>
      <Typography variant='h5'>Viajes</Typography>
      <Table
        url={API.VIAJES}
        columns={TABLE_COLUMNS.VIAJES}
        section={'viajes'}
        createRoute={'/dashboard/viajes/crear'}
        detailRoute={'/dashboard/viajes/detalle'}
        editRoute={'/dashboard/viajes/editar'}
      />
    </Box>
  );
}