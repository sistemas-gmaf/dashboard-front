import { Box, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';

export default function VehiculosPage() {
  return (
    <Box>
      <Typography variant='h5'>Vehículos</Typography>
      <Table
        url={API.VEHICULOS}
        columns={TABLE_COLUMNS.VEHICULOS}
        section={'vehiculos'}
        createRoute={'/dashboard/vehiculos/crear'}
        detailRoute={'/dashboard/vehiculos/detalle'}
        editRoute={'/dashboard/vehiculos/editar'}
        customDeleteId={'id_vehiculo'}
      />
    </Box>
  );
}