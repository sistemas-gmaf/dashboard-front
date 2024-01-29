'use client'

import { Box, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";
import DatosViaje from "./subcomponents/DatosViaje";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.VIAJES, id });
  const [ data, setData ] = useState(false);

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => {
      console.log(data)

      setData({
        ...data,
        bitacoras: data.bitacoras.map(({observacion}) => observacion)
      });
    }});
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
      {data 
        ? <DatosViaje dataViaje={data} />
        : <p>{'Cargando...'}</p>
      }
    </Box>
  )
}
