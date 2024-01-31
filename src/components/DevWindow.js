'use client'

import { setPermisos } from "@/store/slices/user";
import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

function DevWindow() {
  const mail = useSelector(state => state.user.data.mail);
  const dispatch = useDispatch();

  const handleAdministrador = async () => {
    const perms = [
      "VER_INICIO",
      "VER_TRANSPORTES",
      "VER_VEHICULOS",
      "VER_CHOFERES",
      "VER_VIAJES",
      "VER_TARIFARIOS",
      "VER_CLIENTES",
      "VER_CHEQUES",
      "VER_COMPROMISOS",
      "VER_RECORDATORIOS",
      "VER_GESTION_USUARIOS",
      "VER_INICIO_VIAJES_FINALIZADOS",
      "VER_INICIO_VIAJES_PENDIENTES_APROBACION",
      "VER_INICIO_VEHICULOS_UTILIZADOS",
      "VER_INICIO_TOTAL_VENTAS",
      "VER_INICIO_TOTAL_COMPRAS",
      "VER_INICIO_TOTAL_BENEFICIO",
      "VER_INICIO_CHEQUES_PENDIENTES",
      "VER_INICIO_COMPROMISOS_PENDIENTES",
      "CREAR_TRANSPORTE",
      "EDITAR_TRANSPORTE",
      "ELIMINAR_TRANSPORTE",
      "CREAR_VEHICULO",
      "EDITAR_VEHICULO",
      "ELIMINAR_VEHICULO",
      "CREAR_CHOFER",
      "EDITAR_CHOFER",
      "ELIMINAR_CHOFER",
      "CREAR_VIAJE",
      "EDITAR_VIAJE",
      "ELIMINAR_VIAJE",
      "APROBAR_VIAJE",
      "CREAR_TARIFARIO_CLIENTE",
      "EDITAR_TARIFARIO_CLIENTE",
      "ELIMINAR_TARIFARIO_CLIENTE",
      "CREAR_TARIFARIO_PROVEEDOR",
      "EDITAR_TARIFARIO_PROVEEDOR",
      "ELIMINAR_TARIFARIO_PROVEEDOR",
      "CREAR_TARIFARIO_PROVEEDOR_ESPECIAL",
      "EDITAR_TARIFARIO_PROVEEDOR_ESPECIAL",
      "ELIMINAR_TARIFARIO_PROVEEDOR_ESPECIAL",
      "IMPORTAR_TARIFARIOS_MASIVO",
      "CREAR_CLIENTE",
      "EDITAR_CLIENTE",
      "ELIMINAR_CLIENTE",
      "CREAR_RECORDATORIO",
      "EDITAR_RECORDATORIO",
      "ELIMINAR_RECORDATORIO",
      "CREAR_CHEQUE",
      "EDITAR_CHEQUE",
      "ELIMINAR_CHEQUE",
      "CREAR_COMPROMISO",
      "EDITAR_COMPROMISO",
      "ELIMINAR_COMPROMISO",
      "CREAR_USUARIO",
      "EDITAR_USUARIO",
      "ELIMINAR_USUARIO",
      "CREAR_ROL",
      "EDITAR_ROL",
      "ELIMINAR_ROL"
    ];

    dispatch(setPermisos(perms));
  }
  
  const handleEmpleado = async () => {
    const perms = [
      "VER_INICIO",
      "VER_TRANSPORTES",
      "VER_VEHICULOS",
      "VER_CHOFERES",
      "VER_VIAJES",
      "VER_RECORDATORIOS",
      "VER_INICIO_VIAJES_FINALIZADOS",
      "VER_INICIO_VEHICULOS_UTILIZADOS",
      "VER_INICIO_TOTAL_VENTAS",
      "CREAR_TRANSPORTE",
      "EDITAR_TRANSPORTE",
      "ELIMINAR_TRANSPORTE",
      "CREAR_VEHICULO",
      "EDITAR_VEHICULO",
      "ELIMINAR_VEHICULO",
      "CREAR_CHOFER",
      "EDITAR_CHOFER",
      "ELIMINAR_CHOFER",
      "CREAR_VIAJE",
      "EDITAR_VIAJE",
      "ELIMINAR_VIAJE"
    ];

    dispatch(setPermisos(perms));
  }
  
  const handleAdministrativo = async () => {
    const perms = [
      "VER_INICIO",
      "VER_TRANSPORTES",
      "VER_VEHICULOS",
      "VER_CHOFERES",
      "VER_VIAJES",
      "VER_TARIFARIOS",
      "VER_CLIENTES",
      "VER_RECORDATORIOS",
      "VER_INICIO_VIAJES_FINALIZADOS",
      "VER_INICIO_VEHICULOS_UTILIZADOS",
      "VER_INICIO_TOTAL_VENTAS",
      "CREAR_TRANSPORTE",
      "EDITAR_TRANSPORTE",
      "ELIMINAR_TRANSPORTE",
      "CREAR_VEHICULO",
      "EDITAR_VEHICULO",
      "ELIMINAR_VEHICULO",
      "CREAR_CHOFER",
      "EDITAR_CHOFER",
      "ELIMINAR_CHOFER",
      "CREAR_VIAJE",
      "EDITAR_VIAJE",
      "ELIMINAR_VIAJE",
      "CREAR_TARIFARIO_CLIENTE",
      "EDITAR_TARIFARIO_CLIENTE",
      "CREAR_TARIFARIO_PROVEEDOR",
      "EDITAR_TARIFARIO_PROVEEDOR",
      "CREAR_TARIFARIO_PROVEEDOR_ESPECIAL",
      "EDITAR_TARIFARIO_PROVEEDOR_ESPECIAL",
      "IMPORTAR_TARIFARIOS_MASIVO",
      "CREAR_CLIENTE",
      "EDITAR_CLIENTE",
      "ELIMINAR_CLIENTE",
      "CREAR_RECORDATORIO",
      "EDITAR_RECORDATORIO",
      "ELIMINAR_RECORDATORIO"
    ];

    dispatch(setPermisos(perms));
  }
  
  return (
    (mail === 'sistemas@grupomaf.com.ar' || mail === 'pruebas@grupomaf.com.ar') 
    ? <Box sx={{ zIndex: 100000, paddingRight: '1em', position: 'fixed', width: '10vw', height: '10vh', bottom: 50, right: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'right', gap: '.5em' }}>
          <Button variant='contained' onClick={handleAdministrador} size='small'>Administrador</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', gap: '.5em' }}>
          <Button variant='contained' onClick={handleEmpleado} size='small'>Empleado</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', gap: '.5em' }}>
          <Button variant='contained' onClick={handleAdministrativo} size='small'>Administrativo</Button>
        </Box>
      </Box> : <></>
  )
}

export default DevWindow