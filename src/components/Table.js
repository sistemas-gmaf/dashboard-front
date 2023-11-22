'use client'

import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Button, Stack } from '@mui/material';

import Link from 'next/link';
import { useTable } from '@/hooks/useTable';

export default function Table({ 
  url,
  columns,
  disableActions = false, 
  disableDetail = false,
  disableEdit = false,
  disableDelete = false,
  disableCreate = false,
  createRoute,
  detailRoute,
  editRoute
}) {
  const { rows, deleteCallback } = useTable({ url });

  const tableColumns = disableActions ? columns : [
    ...columns,
    { 
      headerName: 'Acciones',
      minWidth: 170, flex: 1,
      renderCell: ({ id }) => <div>
        {!disableDetail && <IconButton href={`${detailRoute}/${id}`} LinkComponent={Link}>
          <VisibilityIcon />
        </IconButton>}
        {!disableEdit && <IconButton href={`${editRoute}/${id}`} LinkComponent={Link}>
          <EditIcon />
        </IconButton>}
        {!disableDelete && <IconButton onClick={() => deleteCallback(id)}>
          <DeleteIcon />
        </IconButton>}
      </div>
    }
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ 
        display: 'flex', 
        padding: '.5em', 
        justifyContent: !disableCreate ? 'space-between' : 'flex-start',
        flexDirection: {
          xs: 'column-reverse',
          sm: 'initial'
        }
      }}>
        <GridToolbarQuickFilter
          InputProps={{ placeholder: 'Buscar...' }}
        />
        {!disableCreate && <Button
          color='secondary'
          href={createRoute}
          LinkComponent={Link}
          endIcon={<AddIcon />}
        >
          Crear Nuevo
        </Button>}
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 450, width: '100%', marginTop: '3em' }}>
      <DataGrid
        rows={rows}
        columns={tableColumns}
        disableColumnMenu={true}
        disableRowSelectionOnClick={true}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          }
        }}
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} de ${count}`,
          },
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
  )
}
