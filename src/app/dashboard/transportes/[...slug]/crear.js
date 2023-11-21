'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import moment from "moment/moment";
import { post } from "@/utils/httpClient";
import { API } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function Crear() {
  const [ formData, setFormData ] = useState({});
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    post({
      url: `${API.TRANSPORTES}`,
      data: formData,
      onSuccess: () => {
        alert('Transporte creado');
        router.push('/dashboard/transportes');
      }
    })
  }

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear transporte
      </Typography>
      <Stack
        alignItems={'center'}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, minWidth: { xs: '100%', md: 500 } }}>
          <TextField
            onChange={e => setFormData({
              ...formData,
              [e.target.id]: e.target.value,
              fecha_creacion: moment().format('YYYY-MM-DD') /*@TODO: Esto lo debe manejar el backend*/
            })}
            fullWidth
            id="nombre" 
            label="Nombre" 
            variant="outlined"
            autoComplete="off"
            sx={{ mt: 3 }}
            required
          />
          <TextField
            onChange={e => setFormData({
              ...formData,
              [e.target.id]: e.target.value
            })}
            fullWidth
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
            endIcon={<AddIcon />}
          >
            Crear
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
