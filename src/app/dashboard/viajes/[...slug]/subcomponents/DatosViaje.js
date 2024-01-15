import { formatNumberToCurrency } from "@/utils/numbers";
import { Box, Typography } from "@mui/material";
import moment from "moment";

export default function DatosViaje({dataViaje}) {
  return (
    <Box sx={{ 
      display: 'flex', 
      marginBottom: 5, 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      gap: 10
    }}>
      <Box sx={{ flexBasis: 300 }}>
        <Typography variant="h5" textAlign={'left'} mb={3}>
          Datos del viaje
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Fecha de Salida: {moment(dataViaje.viaje.fecha_salida, 'YYYYMMDD').format('LL')}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Cliente: {dataViaje.viaje.clienteData.razon_social}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Transporte: {dataViaje.viaje.vehiculoData.transporte_nombre}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tipo de Vehiculo: {dataViaje.viaje.vehiculoData.vehiculo_tipo_descripcion}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Patente: {dataViaje.viaje.vehiculoData.vehiculo_patente}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Zona: {dataViaje.viaje.zonaData.descripcion}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Cantidad de Ayudantes: {dataViaje.viaje.cantidad_ayudantes}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          {dataViaje.viaje.segundo_viaje === "true"
            ? `Segundo viaje con %${dataViaje.viaje.segundo_viaje_porcentaje} de descuento`
            : 'Sin segundo viaje'}
        </Typography>
      </Box>
      <Box sx={{ flexBasis: 300 }}>
        <Typography variant="h5" textAlign={'left'} mb={3}>
          Datos de Tarifa
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Cliente: {formatNumberToCurrency(dataViaje.tarifas.cliente_monto)}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa Total al Cliente por Ayudantes: 
          {formatNumberToCurrency(
            dataViaje.tarifas.cliente_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Transporte: {formatNumberToCurrency(dataViaje.tarifas.transporte_monto)}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa Total del Transporte por Ayudantes: 
          {formatNumberToCurrency(
            dataViaje.tarifas.transporte_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Valor Neto Total:
          {formatNumberToCurrency(
            (
              Number(dataViaje.tarifas.cliente_monto) + 
              Number(dataViaje.tarifas.cliente_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            )
            -
            (
              Number(dataViaje.tarifas.transporte_monto) + 
              Number(dataViaje.tarifas.transporte_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            )
          )}
        </Typography>
      </Box>
      {dataViaje.viaje.segundo_viaje === "true" && <Box sx={{ flexBasis: 300 }}>
        <Typography variant="h5" textAlign={'left'} mb={3}>
          Datos de Tarifa Segundo Viaje con Descuento
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Cliente: {formatNumberToCurrency(
            dataViaje.tarifas.cliente_monto
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa Total al Cliente por Ayudantes: 
          {formatNumberToCurrency(
            dataViaje.tarifas.cliente_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Transporte: {formatNumberToCurrency(
            dataViaje.tarifas.transporte_monto
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa Total del Transporte por Ayudantes: 
          {formatNumberToCurrency(
            dataViaje.tarifas.transporte_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Valor Neto Total (Del Segundo Viaje con Descuento):
          {formatNumberToCurrency(
            ((
              Number(dataViaje.tarifas.cliente_monto) + 
              Number(dataViaje.tarifas.cliente_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            )
            -
            (
              Number(dataViaje.tarifas.transporte_monto) + 
              Number(dataViaje.tarifas.transporte_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            ))
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
      </Box>}
    </Box>
  )
}
