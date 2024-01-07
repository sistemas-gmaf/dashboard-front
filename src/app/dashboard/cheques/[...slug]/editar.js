'use client'

import { Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";
import moment from "moment";

export default function Editar({ id }) {
  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/recordatorios');
  };

  const fields = [
    { 
      type: 'textfield', 
      label: 'Titulo', 
      name: 'titulo',
      required: true,
    },
    { 
      type: 'textfield', 
      label: 'Descripcion', 
      name: 'descripcion',
    },
    { 
      type: 'date', 
      label: 'Fecha Limite', 
      name: 'fecha_limite',
      required: true,
    },
    { 
      type: 'number', 
      label: 'Dias de Aviso', 
      name: 'cantidad_dias_aviso',
      required: true,
    },
  ];

  const handleGetDefaultData = (formdata) => {
    return {
      ...formdata,
      fecha_limite: moment(formdata.fecha_limite, 'YYYYMMDD').format('YYYY-MM-DD')
    };
  }

  const handleSubmitCustomFormdata = (formdata) => {
    return {
      ...formdata,
      fecha_limite: moment(formdata.fecha_limite).format('YYYYMMDD')
    };
  }

  const { Form } = useFormCustom({ 
    handleSubmitCustomFormdata,
    url: API.RECORDATORIOS,
    handleGetDefaultData,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar recordatorios
      </Typography>
      <Stack alignItems={'center'}>
        <Form />
      </Stack>
    </Box>
  )
}
