'use client'

import { useFormCustom } from "@/hooks/useFormCustom";
import { API } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";


export default function Crear() {
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

  const handleSubmitCustomFormdata = (formdata) => {
    return { 
      ...formdata, 
      fecha_emision: moment(formdata.fecha_emision).format('YYYYMMDD'),
      fecha_pago: moment(formdata.fecha_pago).format('YYYYMMDD'),
      estado: formdata.estado.id,
      proveedor: formdata.proveedor.id,
      referencia: formdata.referencia.id,
      banco: formdata.banco.id
    };
  };

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.CHEQUES,
    fields
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear Cheque
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
