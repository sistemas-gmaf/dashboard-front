'use client'

import { useFormCustom } from "@/hooks/useFormCustom";
import { ApiClient } from "@/utils/apiClient";
import { API } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import Swal from "sweetalert2";


export default function Crear() {
  const apiClient = new ApiClient({ url: API.TARIFARIO_TRANSPORTES_ESPECIALES });
  let submitData = {};

  const fields = [
    { 
      type: 'autocomplete', 
      label: 'Transporte', 
      name: 'transporte',
      url: API.TRANSPORTES,
      optionLabels: ['nombre'],
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Cliente', 
      name: 'cliente',
      url: API.CLIENTES,
      optionLabels: ['razon_social'],
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Tipo de Vehiculo', 
      name: 'vehiculo_tipo',
      url: API.VEHICULOS_TIPOS,
      optionLabels: ['descripcion'],
      required: true,
      freeSolo: true
    },
    { 
      type: 'autocomplete', 
      label: 'Zona', 
      name: 'zona',
      url: API.ZONAS,
      optionLabels: ['descripcion'],
      required: true,
      freeSolo: true
    },
    { 
      type: 'currency', 
      label: 'Monto', 
      name: 'monto',
      required: true,
    },
    { 
      type: 'currency', 
      label: 'Monto por Ayudante', 
      name: 'monto_por_ayudante',
      required: true,
    },
    { 
      type: 'date', 
      label: 'Fecha Validez Desde', 
      name: 'fecha_desde',
      required: true,
    },
    { 
      type: 'date', 
      label: 'Fecha Validez Hasta', 
      name: 'fecha_hasta',
    },
  ];

  const handleSubmitCustomFormdata = (formdata) => {
    submitData = { 
      ...formdata, 
      fecha_desde: moment(formdata.fecha_desde).format('YYYYMMDD'),
      fecha_hasta: formdata.fecha_hasta && formdata.fecha_hasta != 'Fecha inválida' && moment(formdata.fecha_hasta).format('YYYYMMDD'),
      transporte: formdata.transporte.id,
      cliente: formdata.cliente.id,
      zona: formdata.zona.descripcion,
      vehiculo_tipo: formdata.vehiculo_tipo.descripcion,
    };

    return submitData;
  };

  const handleSuccess = async (resetForm, response) => {
    if (response.status !== 409) {
      await Swal.fire({
        icon: 'success',
        text: 'Tarifario creado con exito'
      });
      resetForm();
      return;
    }

    const result = await response.json();

    const userConfirm = await Swal.fire({
      title: 'Hay un tarifario vigente para la zona/tipo-vehiculo seleccionados',
      html: `
        <p>¿Desea que el tarifario que está vigente, deje de estar vigente a partir de la fecha de inicio 
        del tarifario que ud ingresó?</p>
        <p>Monto en Vigencia: $${result.data.monto}</p>
        <p>Monto Por Ayudante en Vigencia: $${result.data.monto_por_ayudante}</p>
      `,
      icon: 'question',
      confirmButtonText: 'Quiero sobreescribirlo con el que ingresé',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    });

    if (userConfirm.isConfirmed) {
      await apiClient.post({
        data: { 
          ...submitData,
          sobreescribir_tarifario: true,
          sobreescribir_tarifario_id: result.data.id
        },
        onSuccess: async () => {
          await Swal.fire({
            text: 'Tarifario creado con exito',
            icon: 'success'
          });
          resetForm();
        }
      });
    } else {
      await Swal.fire({
        text: 'Tarifario de cliente sin guardar',
        icon: 'info'
      });
    }
  }

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.TARIFARIO_TRANSPORTES_ESPECIALES,
    onSuccess: handleSuccess,
    forceOnSuccess: true,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear Tarifario Especial de Transporte
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
        <Typography mt={3}>
          *En caso de no aclarar una "Fecha Validez Hasta" el tarifario estará vigente hasta crear uno nuevo
        </Typography>
      </Stack>
    </Box>
  )
}
