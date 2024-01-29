'use client'

import { Box, Button, Typography } from "@mui/material";

import moment from "moment";
import 'moment/locale/es';

import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";
import { useFormCustom } from "@/hooks/useFormCustom";
import { useRouter } from "next/navigation";

export default function ViajesEspeciales({ id }) {
  const apiClient = new ApiClient({ url: API.VIAJES_ESPECIALES, id });
  const [ data, setData ] = useState({});
  let action;

  const router = useRouter();

  useEffect(() => {
    apiClient.get({ onSuccess: ({data}) => setData(data) });
  }, []);

  const fields = [
    { 
      type: 'currency', 
      label: 'Tarifa Cliente', 
      name: 'monto_cliente',
      required: true,
    },
    { 
      type: 'currency', 
      label: 'Tarifa Cliente por Ayudante', 
      name: 'monto_cliente_por_ayudante',
      required: true,
    },
    { 
      type: 'currency', 
      label: 'Tarifa Transporte', 
      name: 'monto_transporte',
      required: true,
    },
    { 
      type: 'currency', 
      label: 'Tarifa Transporte por Ayudante', 
      name: 'monto_transporte_por_ayudante',
      required: true,
    },
    { 
      type: 'number', 
      label: 'Cantidad de ayudantes', 
      name: 'cantidad_ayudantes',
      required: true,
    },
  ];

  const onSuccess = () => {
    router.push('/dashboard/viajes');
  };

  const customSubmit = (formdata) => {
    apiClient.patch({
      data: { 
        ...formdata, 
        cantidad_ayudantes: Number(formdata.cantidad_ayudantes || data.cantidad_ayudantes).toString(),
        action 
      },
      onSuccess: () => {
        router.push('/dashboard/viajes');
      }
    })
  };

  const { Form } = useFormCustom({ 
    url: API.VIAJES_ESPECIALES,
    customSubmit,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em', paddingX: { xs: 0, md: '20%' } }}>
      <Typography variant="h5" textAlign={'center'}>
        Datos de Viaje
      </Typography>
      <Box sx={{ display: 'flex', gap: '1em', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div>
          <Typography variant="body1" textAlign={'center'}>
            Estado de aprobacion: 
            {data?.estado || 'Cargando...'}
          </Typography>
          <Typography variant="body1" textAlign={'center'}>
            Tipo de Vehiculo: {data?.vehiculo_tipo || 'Cargando...'}
          </Typography>
          <Typography variant="body1" textAlign={'center'}>
            Zona: {data?.zona || 'Cargando...'}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" textAlign={'center'}>
            Cliente: {data?.cliente || 'Cargando...'}
          </Typography>
          <Typography variant="body1" textAlign={'center'}>
            Transporte: {data?.transporte || 'Cargando...'}
          </Typography>
          <Typography variant="body1" textAlign={'center'}>
            Fecha Salida: 
            {data?.fecha_salida ? `${moment(data?.fecha_salida, 'YYYYMMDD').format('LL')}` : 'Cargando...'}
          </Typography>
        </div>
      </Box>
      <Typography variant="h5" textAlign={'center'}>
        Aprobación de Tarifas del Viaje
      </Typography>
      <Form>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2
        }}>

          <Button 
            style={{ flexGrow: 1, flexBasis: 300 }}
            color="info" 
            variant="contained"
            type="submit"
            onClick={() => action = 'borrador'}
          >
            Guardar Borrador
          </Button>

          <Button 
            style={{ flexGrow: 1, flexBasis: 300 }}
            variant="contained"
            type="submit"
            onClick={() => action = 'aprobar'}
          >
            Guardar y Aprobar
          </Button>
        </Box>
      </Form>      
    </Box>
  )
}
