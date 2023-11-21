'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import moment from "moment/moment";

export default function Crear() {
  const [ formData, setFormData ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/transportes');
      const transportes = await response.json();
      const transporteMaxId = transportes.reduce((max, objeto) => (objeto.id > max ? objeto.id : max), 0);

      await fetch('http://localhost:5000/transportes', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          id: transporteMaxId + 1
        })
      })

      alert('Transporte creado');
    } catch (error) {
      alert('Error al crear transporte: ' + error);
    }
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
              fecha_creacion: moment().format('YYYY-MM-DD')
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
