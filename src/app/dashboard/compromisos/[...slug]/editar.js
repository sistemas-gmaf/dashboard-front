'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";
import moment from "moment";

export default function Editar({ id }) {
  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/compromisos');
  };

  const fields = [
    { 
      type: 'autocomplete', 
      label: 'Categoria', 
      name: 'categoria',
      url: API.COMPROMISOS_CATEGORIAS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Razon Social', 
      name: 'razon_social',
      url: API.COMPROMISOS_RAZONES_SOCIALES,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Referencia', 
      name: 'referencia',
      url: API.COMPROMISOS_REFERENCIAS,
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
      type: 'date', 
      label: 'Fecha', 
      name: 'fecha',
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Estado', 
      name: 'estado',
      url: API.COMPROMISOS_ESTADOS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
  ];

  const handleGetDefaultData = (formdata) => {
    return { 
      ...formdata, 
      categoria: { id: formdata.categoria, descripcion: formdata.categoria },
      razon_social: { id: formdata.razon_social, descripcion: formdata.razon_social },
      referencia: { id: formdata.referencia, descripcion: formdata.referencia },
      estado: { id: formdata.estado, descripcion: formdata.estado }
    };
  }

  const handleSubmitCustomFormdata = (formdata) => {
    return { 
      ...formdata, 
      fecha: moment(formdata.fecha).format('YYYYMMDD')
    };
  };

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.COMPROMISOS,
    handleGetDefaultData,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar compromiso
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
