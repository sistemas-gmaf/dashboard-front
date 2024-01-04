'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Editar({ id }) {
  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/clientes');
  };

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
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar cliente
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
