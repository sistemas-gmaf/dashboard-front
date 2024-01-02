'use client'

import { Box, Stack, Typography } from "@mui/material";

import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Crear() {
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
    url: API.CHOFERES,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear vehículo
      </Typography>
      <Stack
        alignItems={'center'}
      >
        <Form />
      </Stack>
    </Box>
  )
}
