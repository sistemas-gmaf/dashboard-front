import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function ChequesPage() {
  return (
    <Box>
      <Typography variant='h5'>Cheques</Typography>
      <Table
        url={API.CHEQUES}
        columns={TABLE_COLUMNS.CHEQUES}
        section={'cheques'}
        createRoute={'/dashboard/cheques/crear'}
        detailRoute={'/dashboard/cheques/detalle'}
        editRoute={'/dashboard/cheques/editar'}
      />
    </Box>
  );
}