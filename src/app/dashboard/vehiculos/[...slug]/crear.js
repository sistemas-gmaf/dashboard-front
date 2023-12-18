'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { API } from "@/utils/constants";
import { useForm } from "react-hook-form";
import Autocomplete from "@/components/Autocomplete";
import FileInput from "@/components/FileInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ApiClient } from "@/utils/apiClient";

const schema = yup.object().shape({
  transporte: yup.object().shape({
    id: yup.number().required()
  }).required('El vehículo debe pertenecer a una empresa de transporte'),
  chofer: yup.object().shape({
    id: yup.number().required()
  }).required('El vehículo debe estar vinculado a un chofer'),
  patente: yup.string().required('La patente es requerida'),
  vehiculo_tipo: yup.object().shape({
    id: yup.number().required()
  }).required('Se debe establecer el tipo de vehículo'),
  vtv: yup.mixed().required('Se debe adjuntar una foto o scan de la vtv del vehículo')
})

export default function Crear() {
  const apiClient = new ApiClient({ url: API.VEHICULOS });
  
  const [ formKey, setFormKey ] = useState(Math.random());

  const { register, handleSubmit, control, resetField, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(formdata => {
    const data = {
      ...formdata,
      transporte: formdata.transporte.id,
      chofer: formdata.chofer.id,
      vehiculo_tipo: formdata.vehiculo_tipo.id
    };

    apiClient.post({ 
      data,
      onSuccess: () => {
        reset();
        setFormKey(Math.random());
      }
    });
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear vehículo
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
            helperText={Boolean(errors.vtv) ? errors.vtv.message : ' '}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 1 }}
            endIcon={<AddIcon />}
          >
            Crear
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
