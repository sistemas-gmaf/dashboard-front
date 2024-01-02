'use client'

import { Box, Typography } from "@mui/material";

import 'moment/locale/es';

import { API } from "@/utils/constants";
import { ApiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import DocVisualize from "@/components/DocVisualize";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.CHOFERES, id });
  const [ data, setData ] = useState({});

  useEffect(() => {
    apiClient.get({ onSuccess: ({data: resp}) => {
      setData(resp);
    }});
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        Nombre: {data?.nombre || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        DNI: {data?.dni || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Celular: {data?.celular || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Correo: {data?.correo || 'Cargando...'}
      </Typography>
      <DocVisualize
        url={data?.dni_frente_url}
        type={data?.dni_frente_filetype}
        title={'DNI Frente'}
      />
      <DocVisualize
        url={data?.dni_dorso_url}
        type={data?.dni_dorso_filetype}
        title={'DNI Dorso'}
      />
      <DocVisualize
        url={data?.licencia_conducir_frente_url}
        type={data?.licencia_conducir_frente_filetype}
        title={'Licencia conducir frente'}
      />
      <DocVisualize
        url={data?.licencia_conducir_dorso_url}
        type={data?.licencia_conducir_dorso_filetype}
        title={'Licencia conducir dorso'}
      />
      <DocVisualize
        url={data?.seguro_vehiculo_url}
        type={data?.seguro_vehiculo_filetype}
        title={'Seguro del vehículo'}
      />
      <DocVisualize
        url={data?.seguro_vida_url}
        type={data?.seguro_vida_filetype}
        title={'Seguro de vida'}
      />
    </Box>
  )
}
