'use client'

import { Box, Stack, Typography } from "@mui/material";

import { API } from "@/utils/constants";

import { useRouter } from "next/navigation";
import { useFormCustom } from "@/hooks/useFormCustom";
import { ApiClient } from "@/utils/apiClient";

export default function Editar({ id }) {
  const router = useRouter();
  const apiClient = new ApiClient({ url: API.VEHICULOS, id });
  
  const handleGetDefaultData = (data) => {
    const {
      transporte_id, transporte_nombre,
      chofer_id, chofer_nombre, chofer_dni,
      vehiculo_patente,
      vehiculo_tipo_id, vehiculo_tipo_descripcion,
      vtv_url,
      vtv_filetype,
      id_vehiculo
    } = data;
    const transporte = { id: transporte_id, nombre: transporte_nombre };
    const chofer = { id: chofer_id, nombre: chofer_nombre, dni: chofer_dni };
    const patente = vehiculo_patente;
    const vehiculo_tipo = { id: vehiculo_tipo_id, descripcion: vehiculo_tipo_descripcion };
    const vtv = vtv_url;

    return { id: id_vehiculo, transporte, chofer, patente, vehiculo_tipo, vtv: { url: vtv, type: vtv_filetype } };
  };

  const handleSubmitCustomFormdata = formdata => {
    return {
      ...formdata,
      vtv: formdata.vtv.url !== null ? formdata.vtv : undefined
    };
  }

  const customSubmit = (formdata, submitFn) => {
    apiClient.patch({
      data: {
        patente: formdata.patente,
        vehiculo_tipo: formdata.vehiculo_tipo.descripcion,
        id: formdata.id
      },
      onSuccess
    });
  }

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
      disabled: true
    },
    { 
      type: 'autocomplete', 
      url: API.CHOFERES, 
      label: 'Chofer', 
      name: 'chofer',
      optionLabels: ['nombre', 'dni'],
      required: true,
      disabled: true
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
      label: 'Tipo de Vehiculo', 
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
    handleGetDefaultData,
    url: API.VEHICULOS,
    customSubmit,
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
