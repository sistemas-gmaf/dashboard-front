'use client'

import { DataGrid } from "@mui/x-data-grid";

import { useTable } from '@/hooks/useTable';
import { slots } from './subcomponents/slots';
import { localeText } from './subcomponents/localeText';
import { slotProps } from './subcomponents/slotProps';
import { Actions } from './subcomponents/Actions';

export default function Table({ 
  url,
  columns,
  section,
  disableActions = false, 
  disableDetail = false,
  disableEdit = false,
  disableDelete = false,
  disableCreate = false,
  createRoute,
  detailRoute,
  editRoute,
  customDeleteId = false
}) {
  const { tableKey, reloadDataTable, rows, deleteCallback, persistentTable } = useTable({ url, section });
  const actionsProps = { disableDetail, disableEdit, disableDelete, detailRoute, editRoute, deleteCallback };

  const tableColumns = disableActions ? columns : [
    ...columns,
    { 
      headerName: 'Acciones',
      minWidth: 170, flex: 1,
      renderCell: ({ id, row }) => <Actions id={id} customDeleteId={row[customDeleteId]} {...actionsProps} />
    }
  ];

  return (
    <div key={tableKey} style={{ height: 470, width: '100%', marginTop: '3em' }}>
      <DataGrid
        rows={rows}
        columns={tableColumns}

        disableColumnMenu
        disableRowSelectionOnClick
        ignoreDiacritics={true}

        {...persistentTable}

        localeText={localeText}
        slots={slots({ disableCreate, createRoute, reloadDataTable })}
        slotProps={slotProps}

        pageSizeOptions={[5, 10]}
      />
    </div>
  )
}
