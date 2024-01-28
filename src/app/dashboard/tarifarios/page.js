'use client'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';

import Table from '@/components/Table/Table';
import { API, TABLE_COLUMNS } from '@/utils/constants';
import { useState } from 'react';
import { getFromStorage } from '@/utils/localStorage';
import ImportRates from '@/components/ImportRates';
import { ApiClient } from '@/utils/apiClient';
import Swal from 'sweetalert2';

export default function TarifariosPage() {
  const apiClient = new ApiClient({ url: API.IMPORTAR_TARIFARIOS });
  const [ tabIndex, setTabIndex ] = useState(getFromStorage('tarifarios/tabIndex') || 0);
  const [ keyRefreshTables, setKeyRefreshTables ] = useState(Math.random());
  
  const handleChangeTab = (e, index) => {
    setTabIndex(index);
    localStorage?.setItem('tarifarios/tabIndex', index);
  }

  const handleImportRates = async excelData => {
    const errors = validateExcel(excelData);

    if (errors.length > 0) {
      return Swal.fire({
        html: `
          <h4>El formato del archivo no es valido</h4>
          ${errors.map(error => `<p>${error}</p>`).join(' ')}
        `,
        icon: 'error'
      })
    }

    const userConfirm = await Swal.fire({
      title: 'Estos tarifarios tendran validez a partir de hoy',
      html: `
        <p>Si hay algun tarifario vigente este finalizara para ayer y a partir de hoy es la validez de las nuevas tarifas</p>
        <p>¿Desea sobreescribir anteriores en caso de haber?</p>
      `,
      icon: 'warning',
      confirmButtonText: 'Guardar/Sobreescribir anteriores',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    });

    if (!userConfirm.isConfirmed) { return; }

    await apiClient.post({
      data: {
        tarifarios: JSON.stringify(excelData)
      },
      onError: async response => {
        const result = await response.json();

        result.errors && await Swal.fire({
          html: `
            <h4>${result.message}</h4>
            ${result.errors.map(error => `<p>${error}</p>`).join(' ')}
          `,
          icon: 'warning'
        })

        !result.errors && await Swal.fire({
          html: `
            <h4>${result.message}</h4>
          `,
          icon: 'warning'
        })
      }
    });

    setKeyRefreshTables(Math.random());
  }

  const validateExcel = excelData => {
    try {
      // columnas obligatorias para el excel
      const columns = ['CLIENTE', 'UNIDAD', 'ZONA', 'VPROVEEDOR', 'VCLIENTE', 'VPROVEEDOR AYUDANTE', 'VCLIENTE AYUDANTE'];
      let errors = [];
      
      columns.forEach(column => {
        if (!excelData[0]?.hasOwnProperty(column)) {
          errors.push(`Falta la columna ${column}`);
        }
      });

      if (excelData.length === 0) {
        errors.push('El excel no tiene datos');
      }

      return errors;
    } catch (error) {
      return false;
    }
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
        </Tabs>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ImportRates onImportData={handleImportRates} />
          <Typography variant='caption'>*Tarifarios de Clientes/Transportes</Typography>
        </Box>
      </Box>
      <Box key={keyRefreshTables}>
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
      </Box>
    </Box>
  );
}