import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function RecordatoriosPage() {
  return (
    <Box>
      <Typography variant='h5'>Compromisos</Typography>
      <Table
        url={API.COMPROMISOS}
        columns={TABLE_COLUMNS.COMPROMISOS}
        section={'compromisos'}
        createRoute={'/dashboard/compromisos/crear'}
        detailRoute={'/dashboard/compromisos/detalle'}
        editRoute={'/dashboard/compromisos/editar'}
      />
    </Box>
  );
}