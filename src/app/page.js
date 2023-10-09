import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';

export default function HomePage() {
  return (
    <Box >
      <div>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hola 👋</AlertTitle>
          Esta aplicación está en construcción
        </Alert>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6} xsOffset={3}>
            <MediaCard
              heading="Estamos trabajando en la aplicación"
              text="Esta es una pantalla de prueba inicial para verificar que el proyecto se visualiza correctamente..."
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
