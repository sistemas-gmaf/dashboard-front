'use client'

import { Box, Stack, Typography } from "@mui/material";

import { API } from "@/utils/constants";

import { useRouter } from "next/navigation";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Editar({ id }) {
  const router = useRouter();
  
  const handleGetDefaultData = (data) => {
    const {
      dni_frente_url, dni_frente_filetype,
      dni_dorso_url, dni_dorso_filetype,
      licencia_conducir_frente_url, licencia_conducir_frente_filetype,
      licencia_conducir_dorso_url, licencia_conducir_dorso_filetype,
      seguro_vehiculo_url, seguro_vehiculo_filetype,
      seguro_vida_url, seguro_vida_filetype,
    } = data;

    return { 
      ...data, 
      dni_frente: { url: dni_frente_url, type: dni_frente_filetype },
      dni_dorso: { url: dni_dorso_url, type: dni_dorso_filetype },
      licencia_conducir_frente: { url: licencia_conducir_frente_url, type: licencia_conducir_frente_filetype },
      licencia_conducir_dorso: { url: licencia_conducir_dorso_url, type: licencia_conducir_dorso_filetype },
      seguro_vehiculo: { url: seguro_vehiculo_url, type: seguro_vehiculo_filetype },
      seguro_vida: { url: seguro_vida_url, type: seguro_vida_filetype },
    };
  };

  const onSuccess = () => {
    router.push('/dashboard/choferes');
  };

  const fields = [
    { 
      type: 'textfield', 
      label: 'Nombre', 
      name: 'nombre',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'DNI', 
      name: 'dni',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Celular', 
      name: 'celular',
    },
    { 
      type: 'textfield', 
      label: 'Correo electronico', 
      name: 'correo',
    },
    { 
      type: 'file', 
      label: 'DNI Frente', 
      name: 'dni_frente',
    },
    { 
      type: 'file', 
      label: 'DNI Dorso', 
      name: 'dni_dorso',
    },
    { 
      type: 'file', 
      label: 'Licencia de conducir frente', 
      name: 'licencia_conducir_frente',
    },
    { 
      type: 'file', 
      label: 'Licencia de conducir dorso', 
      name: 'licencia_conducir_dorso',
    },
    { 
      type: 'file', 
      label: 'Seguro del vehiculo', 
      name: 'seguro_vehiculo',
    },
    { 
      type: 'file', 
      label: 'Seguro de vida', 
      name: 'seguro_vida',
    },
  ];

  const { Form } = useFormCustom({ 
    handleGetDefaultData,
    url: API.CHOFERES,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar chofer
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
