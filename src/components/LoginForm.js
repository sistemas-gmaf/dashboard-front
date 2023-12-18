'use client'

import { login } from "@/utils/auth";
import { Box, Button } from "@mui/material";

function LoginForm() {
  return (
    <Box sx={{ mt: 1 }}>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => login()}
      >
        Iniciar Sesión con Microsoft
      </Button>
    </Box>
  )
}

export default LoginForm