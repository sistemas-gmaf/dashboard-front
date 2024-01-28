import { formatNumberToCurrency } from "@/utils/numbers";
import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";

export default function DatosViaje({dataViaje}) {
  return (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '1em',
      justifyContent: 'center',
      width: {
        xs: '90%',
        md: '45%',
      },
    }}>
      <Box sx={{ /* flexBasis: 300 */ }}>
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
      {/* @TODO: Queda pendiente analizar lo del segundo viaje */}
        {/* <Typography variant="body1" textAlign={'left'}>
          {dataViaje.viaje.segundo_viaje === "true"
            ? `Segundo viaje con %${dataViaje.viaje.segundo_viaje_porcentaje} de descuento`
            : 'Sin segundo viaje'}
        </Typography> */}
      </Box>
      <Box sx={{ /* flexBasis: 300 */ overflow: 'hidden' }}>
        <Typography variant="h5" textAlign={'left'} mb={3}>
          Datos de Tarifa
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Cliente: {formatNumberToCurrency(dataViaje.tarifasViaje.cliente_monto)}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Cliente Por Ayudante: 
          {formatNumberToCurrency(dataViaje.tarifasViaje.cliente_monto_por_ayudante)}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa Total al Cliente por Ayudantes: 
          {formatNumberToCurrency(
            dataViaje.tarifasViaje.cliente_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Transporte: {formatNumberToCurrency(dataViaje.tarifasViaje.transporte_monto)}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Transporte Por ayudante: 
          {formatNumberToCurrency(dataViaje.tarifasViaje.transporte_monto_por_ayudante)}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa Total del Transporte por Ayudantes: 
          {formatNumberToCurrency(
            dataViaje.tarifasViaje.transporte_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
          )}
        </Typography>
        <Typography variant="subtitle2" style={{ paddingTop: '1em' }} textAlign={'left'}>
          Valor Neto Total:
          {formatNumberToCurrency(
            (
              Number(dataViaje.tarifasViaje.cliente_monto) + 
              Number(dataViaje.tarifasViaje.cliente_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            )
            -
            (
              Number(dataViaje.tarifasViaje.transporte_monto) + 
              Number(dataViaje.tarifasViaje.transporte_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            )
          )}
        </Typography>
      </Box>
      <Box sx={{ /* flexBasis: 300 */ }}>
        <Typography variant="h5" textAlign={'left'} mb={3}>
          Datos de Remito
        </Typography>
        <Typography>
          Nro Remito/Hoja de Ruta: 
          <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{dataViaje.nroRemito}</p>
        </Typography>
      </Box>
      <Box>
      <Typography variant="h5">
          Observaciones:
        </Typography>
        <Box sx={{ maxHeight: '20vh', overflowY: 'scroll', padding: '1em' }}>
          {dataViaje.bitacoras.map((bitacora, idx) => 
            <Paper
              elevation={1} 
              key={Math.random() + idx}
              dangerouslySetInnerHTML={{ __html: `<b>${idx+1} -</b> ${bitacora}` }} 
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', padding: '.5em', marginBottom: '1em' }}
            />
          )}
        </Box>
      </Box>
      {/* @TODO: Queda pendiente analizar lo del segundo viaje */}
    {/*   {dataViaje.viaje.segundo_viaje === "true" && <Box sx={{ flexBasis: 300 }}>
        <Typography variant="h5" textAlign={'left'} mb={3}>
          Datos de Tarifa Segundo Viaje con Descuento
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Cliente: {formatNumberToCurrency(
            dataViaje.tarifasViaje.cliente_monto
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
            dataViaje.tarifasViaje.cliente_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Tarifa del Transporte: {formatNumberToCurrency(
            dataViaje.tarifasViaje.transporte_monto
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
            dataViaje.tarifasViaje.transporte_monto_por_ayudante * dataViaje.viaje.cantidad_ayudantes
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
              Number(dataViaje.tarifasViaje.cliente_monto) + 
              Number(dataViaje.tarifasViaje.cliente_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            )
            -
            (
              Number(dataViaje.tarifasViaje.transporte_monto) + 
              Number(dataViaje.tarifasViaje.transporte_monto_por_ayudante) * 
              Number(dataViaje.viaje.cantidad_ayudantes)
            ))
            *
            (
              0.01 *
              (100 - Number(dataViaje.viaje.segundo_viaje_porcentaje))
            )
          )}
        </Typography>
      </Box>} */}
    </Box>
  )
}
