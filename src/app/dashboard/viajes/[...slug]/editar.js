'use client'

import LinearStepper from "@/components/LinearStepper";
import { useFormCustom } from "@/hooks/useFormCustom";
import { useStepper } from "@/hooks/useStepper";
import { API } from "@/utils/constants";
import { Box, Button, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import DatosViaje from "./subcomponents/DatosViaje";


export default function Editar() {
  const steps = [
    'Datos de Viaje',
    'Calcular Tarifas',
    'Verificar Datos'
  ]

  const { handleBack, handleNext, activeStep } = useStepper({ steps });

  const [ dataViaje, setDataViaje ] = useState({});

  /**
   * SECCION DE DATOS DE VIAJE
   */
  const fieldsViaje = [
    {
      type: 'date',
      label: 'Fecha de Salida',
      name: 'fecha_salida',
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Cliente', 
      name: 'cliente',
      url: API.CLIENTES,
      optionLabels: ['razon_social'],
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Vehiculo', 
      name: 'vehiculo',
      url: API.VEHICULOS,
      optionLabels: ['transporte_nombre', 'vehiculo_tipo_descripcion', 'vehiculo_patente'],
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Zona', 
      name: 'zona',
      url: API.ZONAS,
      optionLabels: ['descripcion'],
      freeSolo: true,
      required: true,
    },
    { 
      type: 'number', 
      label: 'Cantidad de Ayudantes', 
      name: 'cantidad_ayudantes',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'segundo_viaje',
      label: 'Habilitar Segundo Viaje con Descuento'
    },
    {
      type: 'number',
      name: 'segundo_viaje_porcentaje',
      label: 'Porcentaje de Descuento del Segundo Viaje',
      required: true
    },
  ];

  const handleSubmitCustomFormdataViaje = (formdata) => {
    return { 
      ...formdata, 
      fecha_salida: moment(formdata.fecha_salida).format('YYYYMMDD'),
      cliente: formdata.cliente.id,
      clienteData: formdata.cliente,
      vehiculo: formdata.vehiculo.id,
      vehiculoData: formdata.vehiculo,
      zona: formdata.zona.id,
      zonaData: formdata.zona,
    };
  };

  const customSubmitViaje = formdata => {
    alert('se deben obtener datos de tarifas');
    console.log(formdata);
    setDataViaje({
      ...dataViaje,
      viaje: formdata,
    });
    handleNext();
  }

  const { Form: ViajeForm, setDefaultValues: setDefaultValuesViajes } = useFormCustom({ 
    handleSubmitCustomFormdata: handleSubmitCustomFormdataViaje,
    customSubmit: customSubmitViaje,
    fields: fieldsViaje,
    url: API.VIAJES,
  });

  useEffect(() => {
    setDefaultValuesViajes({ 
      cantidad_ayudantes: '0',
      segundo_viaje_porcentaje: '30'
    });
  }, []);

  /**
   * SECCION DE CALCULO DE TARIFAS
   */
  const fieldsCalculoTarifas = [
    {
      type: 'currency',
      name: 'cliente_monto',
      label: 'Tarifa Cliente',
      required: true
    },
    {
      type: 'currency',
      name: 'cliente_monto_por_ayudante',
      label: 'Tarifa Cliente Por Ayudante',
      required: true
    },
    {
      type: 'currency',
      name: 'transporte_monto',
      label: 'Tarifa Transporte',
      required: true
    },
    {
      type: 'currency',
      name: 'transporte_monto_por_ayudante',
      label: 'Tarifa Transporte Por Ayudante',
      required: true
    },
  ];

  const customSubmitTarifas = (formdata) => {
    console.log({formdata});
    alert(`
      Aca se deberian guardar las tarifas 
      que se eligieron en el state de la pantalla 
      para luego guardar el viaje 
      (ya sea para guardarlo directamente aprobado 
        o si se modificaron para que se guarde pendiente de aprobacion
      )
    `);
    setDataViaje({
      ...dataViaje,
      tarifas: formdata,
    });
    handleNext();
  }

  const { Form: TarifasForm } = useFormCustom({
    customSubmit: customSubmitTarifas,
    fields: fieldsCalculoTarifas,
  });

  return (
    <Box>
      <Typography variant="h4" textAlign={'center'} style={{ marginBottom: 30 }}>
        Editar Viaje
      </Typography>
      <Stack alignItems={'center'}>
        <LinearStepper steps={steps} activeStep={activeStep} style={{ marginBottom: 30 }} />
        {activeStep === 0 && <ViajeForm maxWidth={{ xs: '100%', md: '50% !important' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' type='submit'>Calcular Tarifa</Button>
            <Button variant='contained' onClick={() => {
              alert('validar que se tengan todos los datos ok y validar si hubo cambios');
              handleNext();
            }} color="info">Siguiente paso (sin editar nada)</Button>
          </Box>
        </ViajeForm>}
        {activeStep === 1 && <TarifasForm maxWidth={{ xs: '100%', md: '50% !important' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={() => handleBack()} color='info'>Atras</Button>
            <Button variant='contained' type='submit'>Siguiente</Button>
          </Box>
        </TarifasForm>}
        {activeStep === 2 && <>
          <DatosViaje dataViaje={dataViaje} />
          <Box sx={{ margin: '1em 0', width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={() => handleBack()} color='info'>Atras</Button>
            <Button variant='contained' onClick={() => alert('funcion de editar')}>Editar viaje</Button>
          </Box>
        </>}
      </Stack>
    </Box>
  )
}
