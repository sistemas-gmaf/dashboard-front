'use client'

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Iniciar Sesión con Microsoft
      </Button>
    </Box>
  )
}

export default LoginForm