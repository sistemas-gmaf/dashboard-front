'use client'

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import moment from "moment";
import 'moment/locale/es';

import { useForm } from "@/hooks/useForm";
import { API } from "@/utils/constants";

export default function Detalle({ id }) {
  const router = useRouter();

  const { formData } = useForm({ 
    id, 
    url: API.TRANSPORTES, 
    callback: () => router.push('/dashboard/transportes')
  });

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        {formData?.nombre}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        {formData?.descripcion}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        {formData?.fecha_creacion && `Fecha de Creación: ${moment(formData?.fecha_creacion, 'YYYY-MM-DD').format('LL')}`}
      </Typography>
    </Box>
  )
}
