'use client'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';
import { useState } from 'react';
import { getFromStorage } from '@/utils/localStorage';

export default function TarifariosPage() {
  const [ tabIndex, setTabIndex ] = useState(getFromStorage('tarifarios/tabIndex') || 0);
  
  const handleChangeTab = (e, index) => {
    setTabIndex(index);
    localStorage?.setItem('tarifarios/tabIndex', index);
  }
  
  const tabProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      style: { maxWidth: 130 }
    };
  }

  return (
    <Box>
      <Typography variant='h5'>Tarifarios</Typography>
      <Box sx={{
        display: 'flex',
        gap: 3,
        justifyContent: {
          xs: 'center',
          md: 'space-between'
        },
        flexDirection: {
          xs: 'column',
          md: 'initial'
        }
      }}>
        <Tabs 
          value={tabIndex}
          onChange={handleChangeTab}
          aria-label='tarifarios tabs' 
          allowScrollButtonsMobile
          variant="scrollable"
        >
          <Tab label='Clientes' {...tabProps(0)} />
          <Tab label='Transportes' {...tabProps(1)} />
          <Tab label='Transportes Especiales' {...tabProps(2)} />
          <Tab label='Aprobacion de Viajes' {...tabProps(3)} />
        </Tabs>
        <Button 
          sx={{
            alignSelf: {
              xs: 'initial',
              md: 'center'
            }
          }} 
          variant='contained'
          onClick={() => alert('accion de importar tarifarios')}
        >
          Importar Tarifarios
        </Button>
      </Box>
      <Box>
        {tabIndex === 0 && <Table
          url={API.TARIFARIO_CLIENTES}
          columns={TABLE_COLUMNS.TARIFARIO_CLIENTES}
          section={'tarifario-clientes'}
          createRoute={'/dashboard/tarifarios/clientes-crear'}
          detailRoute={'/dashboard/tarifarios/clientes-detalle'}
          editRoute={'/dashboard/tarifarios/clientes-editar'}
        />}
        {tabIndex === 1 && <Table
          url={API.TARIFARIO_TRANSPORTES}
          columns={TABLE_COLUMNS.TARIFARIO_TRANSPORTES}
          section={'tarifario-transportes'}
          createRoute={'/dashboard/tarifarios/transportes-crear'}
          detailRoute={'/dashboard/tarifarios/transportes-detalle'}
          editRoute={'/dashboard/tarifarios/transportes-editar'}
          />}
        {tabIndex === 2 && <Table
          url={API.TARIFARIO_TRANSPORTES_ESPECIALES}
          columns={TABLE_COLUMNS.TARIFARIO_TRANSPORTES_ESPECIALES}
          section={'tarifario-transportes-especiales'}
          createRoute={'/dashboard/tarifarios/transportes-especiales-crear'}
          detailRoute={'/dashboard/tarifarios/transportes-especiales-detalle'}
          editRoute={'/dashboard/tarifarios/transportes-especiales-editar'}
          />}
        {tabIndex === 3 && <Table
          disableCreate={true}
          disableDetail={true}
          disableDelete={true}
          url={API.TARIFARIO_VIAJES_ESPECIALES}
          columns={TABLE_COLUMNS.TARIFARIO_VIAJES_ESPECIALES}
          section={'tarifario-viajes-especiales'}
          editRoute={'/dashboard/tarifarios/viajes-especiales-editar'}
        />}
      </Box>
    </Box>
  );
}