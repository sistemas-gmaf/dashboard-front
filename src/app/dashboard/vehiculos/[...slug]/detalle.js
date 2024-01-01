'use client'

import { Box, Typography } from "@mui/material";

import 'moment/locale/es';

import { API } from "@/utils/constants";
import { ApiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import DocVisualize from "@/components/DocVisualize";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.VEHICULOS, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data: resp}) => {
      setData(resp);
    }});
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        Tipo: {data?.vehiculo_tipo_descripcion || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Patente: {data?.vehiculo_patente || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Empresa de transporte: {data?.transporte_nombre || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Nombre del chofer: {data?.chofer_nombre || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        DNI del chofer: {data?.chofer_dni || 'Cargando...'}
      </Typography>
      <DocVisualize
        url={data?.vtv_url}
        type={data?.vtv_filetype}
        title={'Documentación verificación técnica'}
      />
    </Box>
  )
}
