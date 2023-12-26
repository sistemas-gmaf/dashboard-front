'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Editar({ id }) {
  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/transportes');
  };

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
  ];

  const { Form } = useFormCustom({ 
    url: API.TRANSPORTES,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar transporte
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
