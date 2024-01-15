'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";
import moment from "moment";

export default function Editar({ id }) {
  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/cheques');
  };

  const fields = [
    { 
      type: 'date', 
      label: 'Fecha Emision', 
      name: 'fecha_emision',
      required: true,
    },
    { 
      type: 'date', 
      label: 'Fecha Pago', 
      name: 'fecha_pago',
      required: true,
    },
    { 
      type: 'number', 
      label: 'Numero', 
      name: 'numero',
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Banco', 
      name: 'banco',
      url: API.CHEQUES_BANCOS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'currency', 
      label: 'Importe', 
      name: 'importe',
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Referencia', 
      name: 'referencia',
      url: API.CHEQUES_REFERENCIAS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Proveedor', 
      name: 'proveedor',
      url: API.CHEQUES_PROVEEDORES,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Estado', 
      name: 'estado',
      url: API.CHEQUES_ESTADOS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
  ];

  const handleGetDefaultData = (formdata) => {
    return { 
      ...formdata, 
      fecha_emision: moment(formdata.fecha_emision, 'YYYYMMDD'),
      fecha_pago: moment(formdata.fecha_pago, 'YYYYMMDD'),
      estado: { id: formdata.estado, descripcion: formdata.estado },
      proveedor: { id: formdata.proveedor, descripcion: formdata.proveedor },
      referencia: { id: formdata.referencia, descripcion: formdata.referencia },
      banco: { id: formdata.banco, descripcion: formdata.banco }
    };
  }

  const handleSubmitCustomFormdata = (formdata) => {
    return { 
      ...formdata, 
      fecha_emision: moment(formdata.fecha_emision).format('YYYYMMDD'),
      fecha_pago: moment(formdata.fecha_pago).format('YYYYMMDD')
    };
  }

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.CHEQUES,
    handleGetDefaultData,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar cheque
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
