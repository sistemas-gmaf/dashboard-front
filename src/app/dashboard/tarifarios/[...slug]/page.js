import { Box, Button } from "@mui/material";
import Link from "next/link";

import CrearCliente from "./clientes/crear";
import DetalleCliente from "./clientes/detalle";
import EditarCliente from "./clientes/editar";

import CrearTransporte from "./transportes/crear";
import DetalleTransporte from "./transportes/detalle";
import EditarTransporte from "./transportes/editar";

import CrearTransporteEspecial from "./transportes-especiales/crear";
import DetalleTransporteEspecial from "./transportes-especiales/detalle";
import EditarTransporteEspecial from "./transportes-especiales/editar";

export default function Detail({ params: { slug } }) {
  const mode = slug[0];
  
  return (
    <Box>
      <div>
        <Button
          href='/dashboard/tarifarios'
          variant='contained'
          LinkComponent={Link}
        >
          Volver
        </Button>
      </div>
      { mode === 'clientes-crear'   && <CrearCliente /> }
      { mode === 'clientes-detalle' && <DetalleCliente id={slug[1]} /> }
      { mode === 'clientes-editar'  && <EditarCliente id={slug[1]} /> }

      { mode === 'transportes-crear'   && <CrearTransporte /> }
      { mode === 'transportes-detalle' && <DetalleTransporte id={slug[1]} /> }
      { mode === 'transportes-editar'  && <EditarTransporte id={slug[1]} /> }

      { mode === 'transportes-especiales-crear'   && <CrearTransporteEspecial /> }
      { mode === 'transportes-especiales-detalle' && <DetalleTransporteEspecial id={slug[1]} /> }
      { mode === 'transportes-especiales-editar'  && <EditarTransporteEspecial id={slug[1]} /> }
    </Box>
  )
}