import { Box, Button } from "@mui/material";
import Link from "next/link";
import Crear from "./crear";
import Detalle from "./detalle";
import Editar from "./editar";

export default function Detail({ params: { slug } }) {
  const mode = slug[0];
  
  return (
    <Box>
      <div>
        <Button
          href='/dashboard/recordatorios'
          variant='contained'
          LinkComponent={Link}
        >
          Volver
        </Button>
      </div>
      { mode === 'crear'   && <Crear /> }
      { mode === 'detalle' && <Detalle id={slug[1]} /> }
      { mode === 'editar'  && <Editar id={slug[1]} /> }
    </Box>
  )
}