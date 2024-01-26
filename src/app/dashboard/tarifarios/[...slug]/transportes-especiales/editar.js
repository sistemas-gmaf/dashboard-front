'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";
import moment from "moment";
import Swal from "sweetalert2";

export default function Editar({ id }) {
  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/tarifarios');
  };

  const fields = [
    { 
      type: 'autocomplete', 
      label: 'Transporte', 
      name: 'transporte',
      url: API.TRANSPORTES,
      optionLabels: ['nombre'],
      required: true,
      disabled: true
    },
    { 
      type: 'autocomplete', 
      label: 'Tipo de Vehiculo', 
      name: 'vehiculo_tipo',
      url: API.VEHICULOS_TIPOS,
      optionLabels: ['descripcion'],
      required: true,
      disabled: true
    },
    { 
      type: 'autocomplete', 
      label: 'Zona', 
      name: 'zona',
      url: API.ZONAS,
      optionLabels: ['descripcion'],
      required: true,
      disabled: true
    },
    { 
      type: 'autocomplete', 
      label: 'Cliente', 
      name: 'cliente',
      url: API.CLIENTES,
      optionLabels: ['razon_social'],
      required: true,
      disabled: true
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
      disabled: true
    },
    { 
      type: 'date', 
      label: 'Fecha Validez Hasta', 
      name: 'fecha_hasta',
      disabled: true
    },
  ];

  const handleGetDefaultData = (formdata) => {
    return { 
      ...formdata, 
      fecha_desde: moment(formdata.fecha_desde, 'YYYYMMDD'),
      fecha_hasta: moment(formdata.fecha_hasta, 'YYYYMMDD'),
      vehiculo_tipo: { id: formdata.id_vehiculo_tipo, descripcion: formdata.vehiculo_tipo },
      zona: { id: formdata.id_zona, descripcion: formdata.zona },
      transporte: { id: formdata.id_transporte, nombre: formdata.transporte },
      cliente: { id: formdata.id_cliente, razon_social: formdata.cliente },
    };
  }

  const handleSubmitCustomFormdata = (formdata) => {
    return { 
      ...formdata, 
      fecha_desde: moment(formdata.fecha_desde).format('YYYYMMDD'),
      fecha_hasta: moment(formdata.fecha_hasta).format('YYYYMMDD'),
      vehiculo_tipo: formdata.vehiculo_tipo.id,
      zona: formdata.zona.id,
      transporte: formdata.transporte.id
    };
  };

  const customSubmit = async (data, submitFn) => {
    const userConfirm = await Swal.fire({
      title: 'Los viajes asociados tambien se modifican',
      html: `
        <p>Todos los viajes asociados con este tarifario se modificaran</p>
        <p>En caso de que quiera realizar un nuevo tarifario vigente cree uno nuevo</p>
      `,
      icon: 'question',
      confirmButtonText: 'Editar de todas formas',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    });

    if (!userConfirm.isConfirmed) { return; }
    
    submitFn(data);
  }

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.TARIFARIO_TRANSPORTES_ESPECIALES,
    handleGetDefaultData,
    customSubmit,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar Tarifario Especial de Transporte
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
        <Typography mt={4}>*Solo se pueden editar los montos</Typography>
      </Stack>
    </Box>
  )
}
