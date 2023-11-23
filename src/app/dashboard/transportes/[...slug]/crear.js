'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import { API } from "@/utils/constants";

export default function Crear() {
  const router = useRouter();

  const { inputProps, handleCreate } = useForm({ 
    url: API.TRANSPORTES, 
    callback: () => router.push('/dashboard/transportes') 
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear transporte
      </Typography>
      <Stack
        alignItems={'center'}
      >
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 1, minWidth: { xs: '100%', md: 500 } }}>
          <TextField
            {...inputProps}
            fullWidth
            id="nombre" 
            label="Nombre" 
            variant="outlined"
            autoComplete="off"
            sx={{ mt: 3 }}
            required
          />
          <TextField
            {...inputProps}
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
