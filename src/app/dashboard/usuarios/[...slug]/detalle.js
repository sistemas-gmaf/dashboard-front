'use client'

import { Box, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.USUARIOS, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => {
      setData(data);
    }});
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h5" textAlign={'center'}>
        Correo: {data?.usuario?.correo ? data?.usuario?.correo : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Fecha de Creación: {data?.usuario?.fecha_creacion_formateada ? `${moment(data?.usuario?.fecha_creacion_formateada, 'DD/MM/YYYY').format('LL')}` : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>Permisos:</Typography>
      <Box
        sx={{ 
          display: 'grid', 
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
          }
        }}
      >
        {
          data?.permisos && data?.permisos
            .filter(permiso => permiso.habilitado === true)
            .map(permiso => <Typography key={permiso} variant="body1" textAlign={'center'}>°{permiso.descripcion}°</Typography>)
        }
      </Box>
    </Box>
  )
}
