'use client'
import { Paper, Box, Grid, Typography } from '@mui/material';

import backgroundLoginImg from '@/img/background-login.jpg';
import { VERSION } from '@/utils/constants';

import LoginForm from '@/components/LoginForm';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

function Version(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Version {VERSION}
    </Typography>
  );
}

export default function Login() {
  const searchParams = useSearchParams();
  const alertMessage = searchParams.get('alert');
  const router = useRouter();

  if (alertMessage && typeof alert !== 'undefined') {
    Swal.fire({
      icon: 'info',
      text: alertMessage
    });
    router.replace('/');
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundLoginImg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 20,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Grupo MAF
          </Typography>
          <LoginForm />
          <Version sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}