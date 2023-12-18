'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { API } from "@/utils/constants";
import { useForm } from "react-hook-form";
import Autocomplete from "@/components/Autocomplete";
import FileInput from "@/components/FileInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";
import { deepClone } from "@/utils/deepClone";
import { isEqual } from "lodash";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  transporte: yup.object().required('El vehículo debe pertenecer a una empresa de transporte'),
  chofer: yup.object().required('El vehículo debe estar vinculado a un chofer'),
  patente: yup.string().required('La patente es requerida'),
  vehiculo_tipo: yup.object().required('Se debe establecer el tipo de vehículo'),
  vtv: yup.mixed().required('Se debe adjuntar una foto o scan de la vtv del vehículo')
})

export default function Crear({ id }) {
  const apiClient = new ApiClient({ url: API.VEHICULOS, id });
  const router = useRouter();
  
  const [ formKey, setFormKey ] = useState(Math.random());
  const [ defaultValues, setDefaultValues ] = useState({});

  const { register, handleSubmit, control, resetField, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    apiClient.get({
      onSuccess: ({ data: {
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
    
        setDefaultValues({ transporte, chofer, patente, vehiculo_tipo, vtv, vtv_filetype });
      }
    });
  }, []);

  useEffect(() => {
    reset(deepClone(defaultValues));
    setFormKey(Math.random());
  }, [defaultValues]);

  const onSubmit = handleSubmit(formdata => {
    // Lógica para enviar solo los valores que han cambiado al backend
    const changedValues = {};
    Object.keys(formdata).forEach((key) => {
      if (!isEqual(formdata[key], defaultValues[key])) {
        changedValues[key] = formdata[key];
      }
    });

    // Filtrar propiedades que no han cambiado
    const inputsAutocomplete = ['transporte', 'chofer', 'vehiculo_tipo'];
    const data = Object.keys(changedValues).reduce((acc, key) => {
      if (inputsAutocomplete.includes(key)) {
        acc[key] = changedValues[key]?.id || undefined;
      } else {
        acc[key] = changedValues[key];
      }
      return acc;
    }, {});

    // Enviar valores cambiados al backend
    console.log({data});

    if (Object.keys(data).length === 0) {
      alert('No se realizó ningún cambio');
      return;
    }

    apiClient.patch({ 
      data,
      onSuccess: () => {
        router.push('/dashboard/vehiculos');
      }
    });
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar vehículo
      </Typography>
      <Stack
        alignItems={'center'}
      >
        <Box key={formKey} component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: { xs: '100%', md: 500 } }}>
          <Autocomplete
            url={API.TRANSPORTES}
            inputLabel="Transporte"
            name='transporte'
            control={control}
            optionLabels={['nombre']}
            error={Boolean(errors.transporte)}
            helperText={Boolean(errors.transporte) ? errors.transporte.message : ' '}
          />
          <Autocomplete
            url={API.CHOFERES}
            inputLabel='Chofer'
            name='chofer'
            control={control}
            optionLabels={['nombre', 'dni']}
            error={Boolean(errors.chofer)}
            helperText={Boolean(errors.chofer) ? errors.chofer.message : ' '}
          />
          <TextField
            fullWidth
            label="Patente" 
            variant="outlined"
            autoComplete="off"
            sx={{ mt: 1 }}
            {...register('patente')}
            inputProps={{ style: { textTransform: "uppercase" } }}
            error={Boolean(errors.patente)}
            helperText={Boolean(errors.patente) ? errors.patente.message : ' '}
          />
          <Autocomplete
            url={API.VEHICULOS_TIPOS}
            inputLabel="Tipo de Vehículo"
            name='vehiculo_tipo'
            control={control}
            optionLabels={['descripcion']}
            error={Boolean(errors.vehiculo_tipo)}
            helperText={Boolean(errors.vehiculo_tipo) ? errors.vehiculo_tipo.message : ' '}
          />
          <FileInput
            name='vtv'
            control={control}
            label='Foto de verificación técnica (VTV)'
            callbackReset={() => resetField('vtv')}
            error={Boolean(errors.vtv)}
            fileToShowUrlDefault={defaultValues?.vtv}
            fileToShowDefault={{ type: defaultValues?.vtv_filetype }}
            helperText={Boolean(errors.vtv) ? errors.vtv.message : ' '}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 1 }}
            endIcon={<EditIcon />}
          >
            Editar
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
