'use client'

import { useFormCustom } from "@/hooks/useFormCustom";
import { API } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";


export default function Crear() {
  const fields = [
    { 
      type: 'textfield', 
      label: 'Nombre de la empresa', 
      name: 'nombre',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Descripcion acerca de la empresa', 
      name: 'descripcion',
    },
    {
      type: 'file',
      label: 'Constancia de AFIP',
      name: 'constancia_afip'
    }
  ];

  const { Form } = useFormCustom({ 
    url: API.TRANSPORTES,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear transporte
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
