'use client'

import { useFormCustom } from "@/hooks/useFormCustom";
import { API } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";


export default function Crear() {
  const fields = [
    { 
      type: 'textfield', 
      label: 'Titulo', 
      name: 'titulo',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Descripcion', 
      name: 'descripcion',
    },
    { 
      type: 'date', 
      label: 'Fecha Limite', 
      name: 'fecha_limite',
      required: true,
    },
    { 
      type: 'number', 
      label: 'Dias de Aviso', 
      name: 'cantidad_dias_aviso',
      required: true,
    },
  ];

  const handleSubmitCustomFormdata = (formdata) => {
    return { 
      ...formdata, 
      fecha_limite: moment(formdata.fecha_limite).format('YYYYMMDD') 
    };
  };

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.RECORDATORIOS,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear Recordatorio
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
