'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get, patch } from "@/utils/httpClient";
import { API } from "@/utils/constants";

export default function Editar({ id }) {
  const router = useRouter();

  const [ formData, setFormData ] = useState({});

  useEffect(() => {
    get({
      url: `${API.TRANSPORTES}/${id}`,
      onSuccess: transporte => setFormData(transporte),
      onError: () => {
        alert('Ocurrio un error al obtener los datos');
        router.push('/dashboard/transportes');
      }
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    patch({
      url: `${API.TRANSPORTES}/${id}`,
      data: formData,
      onSuccess: () => {
        alert('Datos editados correctamente');
        router.push('/dashboard/transportes');
      }
    })
  }

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar transporte
      </Typography>
      <Stack
        alignItems={'center'}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, minWidth: { xs: '100%', md: 500 } }}>
          <TextField
            onChange={e => setFormData({ ...formData, [e.target.id]: e.target.value })}
            fullWidth
            defaultValue={formData?.nombre}
            InputLabelProps={{ shrink: true }}
            id="nombre" 
            label="Nombre" 
            variant="outlined"
            autoComplete="off"
            sx={{ mt: 3 }}
            required
          />
          <TextField
            onChange={e => setFormData({ ...formData, [e.target.id]: e.target.value })}
            fullWidth
            defaultValue={formData?.descripcion}
            InputLabelProps={{ shrink: true }}
            id="descripcion" 
            label="Descripción" 
            variant="outlined"
            autoComplete="off"
            sx={{ mt: 3 }}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3}}
            endIcon={<EditIcon />}
          >
            Editar
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
