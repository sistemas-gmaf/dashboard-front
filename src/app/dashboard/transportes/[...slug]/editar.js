'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Editar({ id }) {
  const router = useRouter();

  const [ formData, setFormData ] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/transportes/${id}`)
      .then(res => res.json())
      .then(transporte => setFormData(transporte))
      .catch(() => {
        alert('Ocurrio un error al obtener los datos');
        router.push('/dashboard/transportes');
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:5000/transportes/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(() => {
        alert('Datos editados correctamente');
        router.push('/dashboard/transportes');
      })
      .catch(() => {
        alert('Error al actualizar datos');
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
