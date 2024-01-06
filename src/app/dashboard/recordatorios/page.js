import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function RecordatoriosPage() {
  return (
    <Box>
      <Typography variant='h5'>Recordatorios</Typography>
      <Table
        url={API.RECORDATORIOS}
        columns={TABLE_COLUMNS.RECORDATORIOS}
        section={'recordatorios'}
        createRoute={'/dashboard/recordatorios/crear'}
        detailRoute={'/dashboard/recordatorios/detalle'}
        editRoute={'/dashboard/recordatorios/editar'}
      />
    </Box>
  );
}