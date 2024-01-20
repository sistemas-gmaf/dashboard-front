'use client'

import { Box, Stack, Typography } from "@mui/material";

import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Crear() {
  const handleSubmitCustomFormdata = formdata => {
    return {
      ...formdata,
      transporte: formdata.transporte.id,
      chofer: formdata.chofer.id,
      vehiculo_tipo: formdata.vehiculo_tipo.id
    }
  };

  const fields = [
    { 
      type: 'autocomplete', 
      url: API.TRANSPORTES, 
      label: 'Transporte', 
      name: 'transporte',
      optionLabels: ['nombre'],
      required: true,
    },
    { 
      type: 'autocomplete', 
      url: API.CHOFERES, 
      label: 'Chofer', 
      name: 'chofer',
      optionLabels: ['nombre', 'dni'],
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Patente', 
      name: 'patente',
      required: true,
    },
    { 
      type: 'autocomplete', 
      url: API.VEHICULOS_TIPOS, 
      label: 'Tipo de vehiculo', 
      name: 'vehiculo_tipo',
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true
    },
    { 
      type: 'file', 
      label: 'Scan de verificación técnica (VTV)', 
      name: 'vtv',
    },
  ];

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.VEHICULOS,
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
