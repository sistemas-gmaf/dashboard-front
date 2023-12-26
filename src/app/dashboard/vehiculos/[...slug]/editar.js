'use client'

import { Box, Stack, Typography } from "@mui/material";

import { API } from "@/utils/constants";

import { useRouter } from "next/navigation";
import { useFormCustom } from "@/hooks/useFormCustom";

export default function Editar({ id }) {
  const router = useRouter();
  
  const handleGetDefaultData = ({ data: {
    transporte_id, transporte_nombre,
    chofer_id, chofer_nombre, chofer_dni,
    vehiculo_patente,
    vehiculo_tipo_id, vehiculo_tipo_descripcion,
    vtv_url,
    vtv_filetype
  } }) => {
    const transporte = { id: transporte_id, nombre: transporte_nombre };
    const chofer = { id: chofer_id, nombre: chofer_nombre, dni: chofer_dni };
    const patente = vehiculo_patente;
    const vehiculo_tipo = { id: vehiculo_tipo_id, descripcion: vehiculo_tipo_descripcion };
    const vtv = vtv_url;

    return { transporte, chofer, patente, vehiculo_tipo, vtv: { url: vtv, type: vtv_filetype } };
  };

  const onSuccess = () => {
    router.push('/dashboard/vehiculos');
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
      label: 'Transporte', 
      name: 'vehiculo_tipo',
      optionLabels: ['descripcion'],
      required: true
    },
    { 
      type: 'file', 
      label: 'Scan de verificación técnica (VTV)', 
      name: 'vtv',
    },
  ];

  const { Form } = useFormCustom({ 
    handleGetDefaultData,
    url: API.VEHICULOS,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar vehículo
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
