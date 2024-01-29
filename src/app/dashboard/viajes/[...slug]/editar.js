'use client'

import LinearStepper from "@/components/LinearStepper";
import { useFormCustom } from "@/hooks/useFormCustom";
import { useStepper } from "@/hooks/useStepper";
import { API } from "@/utils/constants";
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import { useEffect, useState } from "react";
import DatosViaje from "./subcomponents/DatosViaje";
import { ApiClient } from "@/utils/apiClient";
import Swal from "sweetalert2";
import { deepClone } from "@/utils/deepClone";
import { useRouter } from "next/navigation";


export default function Editar({ id: idViaje }) {
  const router = useRouter();
  const steps = [
    'Datos de Viaje',
    'Calcular Tarifas',
    'Remito y Observaciones',
    'Verificar Datos'
  ]

  const { handleBack, handleNext, activeStep } = useStepper({ steps });

  const [ dataViaje, setDataViaje ] = useState({ bitacoras: [] });

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
      customValue: 'id_vehiculo',
      required: true,
    },
    { 
      type: 'autocomplete', 
      label: 'Zona', 
      name: 'zona',
      url: API.ZONAS_TARIFARIO,
      optionLabels: ['descripcion'],
      required: true,
      filteredBy: ['fecha_salida', 'cliente', 'vehiculo'],
      filteredByValues: ['id', 'id', 'id_vehiculo']
    },
    { 
      type: 'number', 
      label: 'Cantidad de Ayudantes', 
      name: 'cantidad_ayudantes',
      required: true,
    },
    /* @TODO: Queda pendiente analizar lo de segundo viaje */
    /* {
      type: 'checkbox',
      name: 'segundo_viaje',
      label: 'Habilitar Segundo Viaje con Descuento'
    },
    {
      type: 'number',
      name: 'segundo_viaje_porcentaje',
      label: 'Porcentaje de Descuento del Segundo Viaje',
      required: true
    }, */
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

  const customSubmitViaje = async formdata => {
    const params = [
      { name: 'id_vehiculo_tipo', value: formdata.vehiculoData.vehiculo_tipo_id }, 
      { name: 'id_zona', value: formdata.zona }, 
      { name: 'id_transporte', value: formdata.vehiculoData.transporte_id },
      { name: 'id_cliente', value: formdata.cliente }, 
      { name: 'fecha_salida', value: formdata.fecha_salida }
    ];
    const urlParams = params.map(param => `${param.name}=${encodeURIComponent(param.value)}`).join('&');
    const apiClient = new ApiClient({ url: `${API.VIAJES_CALCULAR_TARIFAS}?${urlParams}` });

    apiClient.getAll({
      onSuccess: ({data}) => {
        setDataViaje({
          ...dataViaje,
          viaje: {...dataViaje.viaje, ...formdata},
          tarifas: data
        });
        setDefaultTarifas({
          cliente_monto: data[0].monto,
          cliente_monto_por_ayudante: data[0].monto_por_ayudante,
          transporte_monto: data[1].monto,
          transporte_monto_por_ayudante: data[1].monto_por_ayudante
        });
        handleNext();
      }
    });
  }

  const { Form: ViajeForm, setDefaultValues: setDefaultValuesViajes } = useFormCustom({ 
    handleSubmitCustomFormdata: handleSubmitCustomFormdataViaje,
    customSubmit: customSubmitViaje,
    fields: fieldsViaje,
    url: API.VIAJES,
  });

  useEffect(() => {
    const apiClient = new ApiClient({ url: API.VIAJES, id: idViaje });

    Swal.fire({
      title: 'Verifique que se guarden las modificaciones',
      text: 'Las modificaciones no se hacen efectivas hasta clickear en el boton "Editar Viaje" que está al final',
      icon: 'info'
    });

    apiClient.get({
      onSuccess: ({ data }) => {
        setDefaultValuesViajes({
          fecha_salida: data.viaje.fecha_salida,
          vehiculo: data.viaje.vehiculoData,
          cliente: data.viaje.clienteData,
          zona: data.viaje.zonaData,
          cantidad_ayudantes: data.viaje.cantidad_ayudantes
        });
        setDefaultTarifas({
          ...data.tarifasViaje
        });
        setDataViaje(data);
      }
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
    setDataViaje({
      ...dataViaje,
      tarifasViaje: formdata,
    });
    handleNext();
  }

  const { Form: TarifasForm, setDefaultValues: setDefaultTarifas } = useFormCustom({
    customSubmit: customSubmitTarifas,
    fields: fieldsCalculoTarifas,
  });

  const handleSaveViaje = async () => {
    const apiClient = new ApiClient({ url: API.VIAJES,id: idViaje });
    const { tarifasViaje, tarifas, viaje } = dataViaje;
    const tarifarioIsChanged = (
      tarifasViaje.cliente_monto != tarifas[0].monto ||
      tarifasViaje.cliente_monto_por_ayudante != tarifas[0].monto_por_ayudante ||
      tarifasViaje.transporte_monto != tarifas[1].monto ||
      tarifasViaje.transporte_monto_por_ayudante != tarifas[1].monto_por_ayudante
    );

    /* @TODO: Permiso de Aprobar tarifario excepcional no necesita este alert */
    if (tarifarioIsChanged) {
      await Swal.fire({
        title: 'El viaje debe ser aprobado',
        text: 'Al cambiar los montos por defecto este viaje debe ser aprobado por alguien con autorizacion',
        icon: 'info'
      });
    }

    const data = {
      remito: JSON.stringify({
        numero: dataViaje.nroRemito,
        observaciones: dataViaje.bitacoras
      }),
      viaje: JSON.stringify({
        ...viaje,
        id_cliente: viaje.clienteData.id,
        id_vehiculo: viaje.vehiculoData.id_vehiculo,
        id_vehiculo_tipo: viaje.vehiculoData.vehiculo_tipo_id,
        id_zona: viaje.zonaData.id,
        fecha_salida: viaje.fecha_salida,
        cantidad_ayudantes: viaje.cantidad_ayudantes
      }),
      tarifas: JSON.stringify({
        cliente: tarifasViaje.cliente_monto,
        cliente_por_ayudante: tarifasViaje.cliente_monto_por_ayudante,
        transporte: tarifasViaje.transporte_monto,
        transporte_por_ayudante: tarifasViaje.transporte_monto_por_ayudante,
      })
    }

    const result = await apiClient.patch({
      data,
      onSuccess: () => router.push('/dashboard/viajes')
    })
  }

  const observationInputHtml = (value = '') => `
    <style>
      #observation {
        max-height: 20vh; 
        border: 1px solid grey;
        border-radius: .5em;
        margin: 1px;
        padding: 1em;
        overflow-y: scroll;
        text-align: left;
      }
      #observation:read-write:focus {
        outline: none;
      }
    </style>
    <div 
      id="observation" 
      contenteditable
      onpaste="((e) => { e.preventDefault(); document.execCommand('inserttext', false, e.clipboardData.getData('text/plain')); })(event)"
    >${value}</div>
  `;

  const handleAddObservation = async () => {
    const { value: text } = await Swal.fire({
      title: 'Agregar observación:',
      html: observationInputHtml(),
      preConfirm: () => {
        return document.getElementById('observation').innerHTML;
      },
      showCancelButton: true
    });
    if (text) {
      setDataViaje({...dataViaje, bitacoras: [...dataViaje.bitacoras, {observacion: text, activo: true}]});
    }
  }

  const handleEditObservation = async (index) => {
    const { value: text } = await Swal.fire({
      title: 'Agregar observación:',
      html: observationInputHtml(dataViaje.bitacoras[index].observacion),
      preConfirm: () => {
        return document.getElementById('observation').innerHTML;
      },
      showCancelButton: true
    });
    if (text) {
      const bitacoras = deepClone(dataViaje.bitacoras);
      bitacoras[index] = {...bitacoras[index], observacion: text, activo: true};
      setDataViaje({...dataViaje, bitacoras});
    }
  }

  const handleDeleteObservation = async (index) => {
    const userConfirm = await Swal.fire({
      text: '¿Desea borrar la observación?',
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    });

    if (!userConfirm.isConfirmed) { return; }

    const bitacoras = deepClone(dataViaje.bitacoras);
    bitacoras[index].activo = false;

    setDataViaje({ ...dataViaje, bitacoras });
  }

  return (
    <Box>
      <Typography variant="h4" textAlign={'center'} style={{ marginBottom: 30 }}>
        Editar Viaje
      </Typography>
      <Stack alignItems={'center'}>
        <LinearStepper steps={steps} activeStep={activeStep} style={{ marginBottom: 30 }} />
        {activeStep === 0 && <ViajeForm maxWidth={{ xs: '100%', md: '75% !important' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' type='submit'>Recalcular Tarifa</Button>
            <Button variant='contained' onClick={() => handleNext()} color='info'>Siguiente</Button>
          </Box>
          <Typography>
            *En caso de haber cambiado datos de fecha/cliente/vehiculo/zona deberia recalcular el tarifario
          </Typography>
          <Typography>
            *El boton de RECALCULAR TARIFA es para traer el tarifario por defecto, en caso de no necesitarlo, no hace falta
          </Typography>
        </ViajeForm>}
        {activeStep === 1 && <TarifasForm maxWidth={{ xs: '100%', md: '50% !important' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={() => handleBack()} color='info'>Atras</Button>
            <Button variant='contained' type='submit' color='info'>Siguiente</Button>
          </Box>
          <p>*La tarifa por ayudante es INDIVIDUAL, o sea que la tarifa por ayudante es por UN SOLO AYUDANTE</p>
        </TarifasForm>}
        {activeStep === 2 && <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box mb={4}>
              <TextField
                fullWidth
                label={'Nro Remito/Hoja de Ruta'}
                onChange={e => setDataViaje({...dataViaje, nroRemito: e.target.value })}
                autoComplete="off"
                defaultValue={dataViaje.nroRemito}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box mb={4}>
              <Box 
                mb={3}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between' 
                }}
              >
                <Typography>Observaciones:</Typography>
                <Button variant="contained" onClick={handleAddObservation}>Agregar</Button>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3, 
                maxHeight: '30vh', 
                overflowY: 'scroll',
                padding: '.8em'
              }}>
                {dataViaje.bitacoras.filter(bitacora => bitacora.activo).map((bitacora, index) =>
                  <Paper
                    key={`${Math.random()}+${index}`}
                    sx={{ 
                      padding: '1.5em', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }} 
                    elevation={1}
                  >
                    <Box 
                      sx={{ overflow: 'hidden', overflowWrap: 'break-word' }} 
                      dangerouslySetInnerHTML={{ __html: bitacora.observacion }}
                    />
                    <Box sx={{ display: 'flex' }}>
                      <IconButton aria-label="edit" color='info' onClick={() => handleEditObservation(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color='error' onClick={() => handleDeleteObservation(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' onClick={() => handleBack()} color='info'>Atras</Button>
              <Button variant='contained' onClick={() => handleNext()} color='info'>Siguiente</Button>
            </Box>
          </Box>}
        
        {activeStep === 3 && <>
          <DatosViaje dataViaje={{...dataViaje, bitacoras: dataViaje.bitacoras.filter(bitacora => bitacora.activo).map(({ observacion }) => observacion)}} />
          <Box sx={{ margin: '1em 0', width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={() => handleBack()} color='info'>Atras</Button>
            <Button variant='contained' onClick={() => handleSaveViaje()}>Editar viaje</Button>
          </Box>
        </>}
      </Stack>
    </Box>
  )
}
