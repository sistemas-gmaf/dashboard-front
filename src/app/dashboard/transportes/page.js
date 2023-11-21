'use client'

import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Typography, Button, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { del, get } from '@/utils/httpClient';
import { API } from '@/utils/constants';

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ 
      display: 'flex', 
      padding: '.5em', 
      justifyContent: 'space-between',
      flexDirection: {
        xs: 'column-reverse',
        sm: 'initial'
      }
    }}>
      <GridToolbarQuickFilter
        InputProps={{ placeholder: 'Buscar...' }}
      />
      <Button
        color='secondary'
        href='/dashboard/transportes/crear'
        LinkComponent={Link}
        endIcon={<AddIcon />}
      >
        Crear Nuevo
      </Button>
    </GridToolbarContainer>
  );
}

export default function TransportesPage() {
  const [ rows, setRows ] = useState([]);
  const [ reloadTable, setReloadTable ] = useState(Math.random());

  useEffect(() => {
    get({
      url: API.TRANSPORTES,
      onSuccess: transportes => setRows(transportes)
    })
  }, [reloadTable]);

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'nombre', headerName: 'Nombre', minWidth: 170, flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 170, flex: 1  },
    { field: 'fecha_creacion', headerName: 'Fecha de Creación', minWidth: 170, flex: 1  },
    { 
      headerName: 'Acciones',
      minWidth: 170, flex: 1,
      renderCell: ({ id }) => <div>
        <IconButton href={`/dashboard/transportes/detalle/${id}`} LinkComponent={Link}>
          <VisibilityIcon />
        </IconButton>
        <IconButton href={`/dashboard/transportes/editar/${id}`} LinkComponent={Link}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => del({ 
          url: `${API.TRANSPORTES}/${id}`,
          onSuccess: () => {
            alert('Borrado con exito');
            setReloadTable(Math.random());
          } 
        })}>
          <DeleteIcon />
        </IconButton>
      </div>
    }
  ];

  return (
    <Box>
      <Typography variant='h5'>Transportes</Typography>
      <div style={{ height: 450, width: '100%', marginTop: '3em' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 }
            }
          }}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No hay filas
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Filtros sin resultados disponibles
              </Stack>
            ),
            toolbar: CustomToolbar
          }}
          pageSizeOptions={[5, 10]}
          slotProps={{
            pagination: {
              labelRowsPerPage: "Cantidad de Filas:"
            }
          }}
        />
      </div>
    </Box>
  );
}