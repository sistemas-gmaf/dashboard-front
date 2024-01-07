'use client'

import { Box, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";
import { formatNumberToCurrency } from "@/utils/numbers";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.COMPROMISOS, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => setData(data) });
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        Categoria: {data?.categoria || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Razon Social: {data?.razon_social || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Referencia: 
        {data?.referencia || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Importe: {data?.importe ? formatNumberToCurrency(data?.importe) : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Fecha:
        {data?.fecha ? `${moment(data?.fecha, 'YYYYMMDD').format('LL')}` : 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Estado: {data?.estado || 'Cargando...'}
      </Typography>
    </Box>
  )
}
