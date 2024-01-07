'use client'

import { useFormCustom } from "@/hooks/useFormCustom";
import { API } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";


export default function Crear() {
  const fields = [
    { 
      type: 'autocomplete', 
      label: 'Categoria', 
      name: 'categoria',
      url: API.COMPROMISOS_CATEGORIAS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Razon Social', 
      name: 'razon_social',
      url: API.COMPROMISOS_RAZONES_SOCIALES,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Referencia', 
      name: 'referencia',
      url: API.COMPROMISOS_REFERENCIAS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'currency', 
      label: 'Importe', 
      name: 'importe',
      required: true,
    },
    { 
      type: 'date', 
      label: 'Fecha', 
      name: 'fecha',
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Estado', 
      name: 'estado',
      url: API.COMPROMISOS_ESTADOS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
  ];

  const handleSubmitCustomFormdata = (formdata) => {
    return { 
      ...formdata, 
      categoria: formdata.categoria.id,
      razon_social: formdata.razon_social.id,
      referencia: formdata.referencia.id,
      estado: formdata.estado.id,
      fecha: moment(formdata.fecha).format('YYYYDDMM')
    };
  };

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.COMPROMISOS,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear Compromiso
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
