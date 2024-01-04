'use client'

import { useFormCustom } from "@/hooks/useFormCustom";
import { API } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";


export default function Crear() {
  const fields = [
    { 
      type: 'textfield', 
      label: 'CUIT del cliente', 
      name: 'cuit',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Razon social del cliente', 
      name: 'razon_social',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Abreviacion de Razon Social', 
      name: 'abreviacion_razon_social',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Telefono/Celular', 
      name: 'telefono'
    },
    { 
      type: 'textfield', 
      label: 'Email del cliente', 
      name: 'correo'
    },
  ];

  const { Form } = useFormCustom({ 
    url: API.CLIENTES,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear cliente
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
