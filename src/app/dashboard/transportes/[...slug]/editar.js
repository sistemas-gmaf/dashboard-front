'use client'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import { API } from "@/utils/constants";

export default function Editar({ id }) {
  const router = useRouter();

  const { inputProps, handleEdit, formData } = useForm({ 
    id, 
    url: API.TRANSPORTES, 
    callback: () => router.push('/dashboard/transportes') 
  });

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar transporte
      </Typography>
      <Stack
        alignItems={'center'}
      >
        <Box component="form" noValidate onSubmit={handleEdit} sx={{ mt: 1, minWidth: { xs: '100%', md: 500 } }}>
          <TextField
            {...inputProps}
            required
            fullWidth
            id="nombre" 
            label="Nombre" 
            variant="outlined"
            autoComplete="off"
            defaultValue={formData?.nombre}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 3 }}
          />
          <TextField
            {...inputProps}
            required
            fullWidth
            id="descripcion" 
            label="Descripción" 
            variant="outlined"
            autoComplete="off"
            defaultValue={formData?.descripcion}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 3 }}
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
