'use client'

import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';

import 'moment/locale/es';

import { API } from "@/utils/constants";
import { ApiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";

export default function Detalle({ id }) {
  const apiClient = new ApiClient({ url: API.VEHICULOS, id });
  const [ data, setData ] = useState({});
  const [ openModal, setOpenModal ] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    apiClient.get({ onSuccess: ({data: resp}) => {
      setData(resp);
    }});
  }, []);

  return (
    <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
      <Typography variant="h4" textAlign={'center'}>
        Tipo: {data?.vehiculo_tipo_descripcion || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Patente: {data?.vehiculo_patente || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Empresa de transporte: {data?.transporte_nombre || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        Nombre del chofer: {data?.chofer_nombre || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        DNI del chofer: {data?.chofer_dni || 'Cargando...'}
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        {
          data?.vtv_url && <>
            Documentación verificación técnica:
            <IconButton onClick={() => setOpenModal(true)}>
              <PreviewIcon fontSize="large" />
            </IconButton>
          </>
        }
      </Typography>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Previsualización de documento"
        aria-describedby="Previsualización de documento"
        sx={{
          zIndex: 5000
        }}
      >
        <DialogContent>
          <Box
            component={'object'}
            data={data?.vtv_url}
            width={500}
            height={500}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
