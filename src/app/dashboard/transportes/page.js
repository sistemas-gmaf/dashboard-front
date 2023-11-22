import { Box, Typography } from '@mui/material';

import Table from '@/components/Table';
import { API } from '@/utils/constants';

export default function TransportesPage() {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'nombre', headerName: 'Nombre', minWidth: 170, flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 170, flex: 1  },
    { field: 'fecha_creacion', headerName: 'Fecha de Creación', minWidth: 170, flex: 1  },
  ];

  return (
    <Box>
      <Typography variant='h5'>Transportes</Typography>
      <Table
        url={API.TRANSPORTES}
        columns={columns}
        createRoute={'/dashboard/transportes/crear'}
        detailRoute={'/dashboard/transportes/detalle'}
        editRoute={'/dashboard/transportes/editar'}
      />
    </Box>
  );
}