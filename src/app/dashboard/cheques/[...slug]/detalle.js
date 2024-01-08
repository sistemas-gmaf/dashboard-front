'use client'

import { Box, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.CHEQUES, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => setData(data) });
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h5" textAlign={'center'}>
        Fecha de Emisión: 
        {data?.fecha_emision ? `${moment(data?.fecha_emision, 'YYYY-MM-DD').format('LL')}` : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Fecha de Emisión: 
        {data?.fecha_pago ? `${moment(data?.fecha_pago, 'YYYY-MM-DD').format('LL')}` : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Numero: {data?.numero || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Banco: {data?.banco || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Importe: {data?.importe_formateado || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Referencia: {data?.referencia || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Proveedor: {data?.proveedor || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Estado: {data?.estado || 'Cargando...'}
      </Typography>
    </Box>
  )
}
