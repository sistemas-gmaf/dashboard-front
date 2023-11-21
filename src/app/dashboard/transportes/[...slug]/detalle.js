'use client'

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import 'moment/locale/es';

export default function Detalle({ id }) {
  const router = useRouter();

  const [ data, setData ] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/transportes/${id}`)
      .then(res => res.json())
      .then(transporte => setData(transporte))
      .catch(() => {
        alert('Ocurrio un error al obtener los datos');
        router.push('/dashboard/transportes');
      })
  }, [])

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        {data?.nombre}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        {data?.descripcion}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        {data?.fecha_creacion && `Fecha de Creación: ${moment(data?.fecha_creacion, 'YYYY-MM-DD').format('LL')}`}
      </Typography>
    </Box>
  )
}
