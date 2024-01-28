'use client'

import { Box, Tab, Tabs, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';
import { useState } from 'react';
import { getFromStorage } from '@/utils/localStorage';

export default function ViajesPage() {
  const [ tabIndex, setTabIndex ] = useState(getFromStorage('viajes/tabIndex') || 0);

  const tabProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      style: { maxWidth: 130 }
    };
  }

  const handleChangeTab = (e, index) => {
    setTabIndex(index);
    localStorage?.setItem('viajes/tabIndex', index);
  }

  return (
    <Box suppressHydrationWarning >
      <Typography variant='h5'>Viajes</Typography>
      <Tabs
        value={tabIndex}
        onChange={handleChangeTab}
        aria-label='viajes tabs' 
        allowScrollButtonsMobile
        variant="scrollable"
      >
        <Tab label='Viajes' {...tabProps(0)} />
        <Tab label='Pendientes Aprobación' {...tabProps(1)} />
      </Tabs>
      {tabIndex === 0 && <Table
        url={API.VIAJES}
        columns={TABLE_COLUMNS.VIAJES}
        section={'viajes'}
        createRoute={'/dashboard/viajes/crear'}
        detailRoute={'/dashboard/viajes/detalle'}
        editRoute={'/dashboard/viajes/editar'}
      />}
      {tabIndex === 1 && <Table
        disableCreate={true}
        disableDetail={true}
        disableDelete={true}
        url={API.VIAJES_ESPECIALES}
        columns={TABLE_COLUMNS.VIAJES_ESPECIALES}
        section={'viajes-especiales'}
        editRoute={'/dashboard/viajes/viajes-especiales'}
      />}
    </Box>
  );
}