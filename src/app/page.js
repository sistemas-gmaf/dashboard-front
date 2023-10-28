'use client'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import logoImg from '@/img/logo.png';
import { VERSION } from '@/utils/constants';
import { useRouter } from 'next/navigation';

function Version(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Version {VERSION}
    </Typography>
  );
}

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 22,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          src={logoImg}
          width={150}
          alt='logo'
        />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size='large'
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión con Microsoft
          </Button>
        </Box>
      </Box>
      <Version sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}