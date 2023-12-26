'use client'

import { Box, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.TRANSPORTES, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => setData(data) });
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        Nombre: {data?.nombre || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Descripcion: {data?.descripcion || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Fecha de Creacion:
        {data?.fecha_creacion ? `${moment(data?.fecha_creacion, 'YYYY-MM-DD').format('LL')}` : 'Cargando...'}
      </Typography>
    </Box>
  )
}
