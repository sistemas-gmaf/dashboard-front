'use client'

import { Box, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.TARIFARIO_CLIENTES, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => setData(data) });
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h5" textAlign={'center'}>
        Tipo de Vehiculo: 
        {data?.vehiculo_tipo || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Zona: 
        {data?.zona || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Cliente: {data?.razon_social_cliente || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Monto: {data?.monto_formateado || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Monto por Ayudante: {data?.monto_por_ayudante_formateado || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Fecha Validez Desde: 
        {data?.fecha_desde ? `${moment(data?.fecha_desde, 'YYYY-MM-DD').format('LL')}` : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        {data?.fecha_hasta && `Fecha Validez Hasta: ${moment(data?.fecha_hasta, 'YYYY-MM-DD').format('LL')}`}
      </Typography>
    </Box>
  )
}
