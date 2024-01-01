'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Editar({ id }) {
  const router = useRouter();

  const handleGetDefaultData = (data) => {
    const { constancia_afip_url, constancia_afip_filetype } = data;

    return { ...data, constancia_afip: { url: constancia_afip_url, type: constancia_afip_filetype } };
  };
  
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
    {
      type: 'file',
      label: 'Constancia de AFIP',
      name: 'constancia_afip'
    }
  ];

  const { Form } = useFormCustom({ 
    url: API.TRANSPORTES,
    handleGetDefaultData,
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
