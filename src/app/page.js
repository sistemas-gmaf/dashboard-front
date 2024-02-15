'use client'
import { Paper, Box, Grid, Typography } from '@mui/material';

import backgroundLoginImg from '@/img/background-login.jpg';
import loginLogoImg from '@/img/logo-login.jpg';
import { VERSION } from '@/utils/constants';

import LoginForm from '@/components/LoginForm';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

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

  useEffect(() => {
    const alertFn = async () => {
      if (alertMessage && typeof alert !== 'undefined') {
        await Swal.fire({
          icon: 'info',
          text: alertMessage
        });
        router.replace('/');
      }
    };
    
    if (window) {
      const userData = localStorage.getItem('user.data');

      if (userData) {
        router.push('/dashboard/inicio');
      }
    }

    alertFn();
  }, [])

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
          <img
            src={loginLogoImg.src}
            style={{ width: '90%', maxWidth: '300px' }}
          />
          <LoginForm />
          <Version sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}