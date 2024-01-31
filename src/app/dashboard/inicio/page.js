'use client'

import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';

import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import CachedIcon from '@mui/icons-material/Cached';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ApiClient } from '@/utils/apiClient';
import { API } from '@/utils/constants';
import { deepClone } from '@/utils/deepClone';
import { formatNumberToCurrency } from '@/utils/numbers';

const CARDS = [
  { title: 'Viajes Cargados del Mes', icon: EmojiTransportationIcon, permiso: 'VER_INICIO_VIAJES_FINALIZADOS' },
  { title: 'Vehículos Utilizados del Mes', icon: DirectionsCarFilledIcon, permiso: 'VER_INICIO_VEHICULOS_UTILIZADOS' },
  { title: 'Ventas del Mes', icon: SellIcon, permiso: 'VER_INICIO_TOTAL_VENTAS' },
  { title: 'Compras del Mes', icon: ShoppingCartIcon, permiso: 'VER_INICIO_TOTAL_COMPRAS' },
  { title: 'Ganancia del Mes', icon: AttachMoneyIcon, permiso: 'VER_INICIO_TOTAL_BENEFICIO' },
  { title: 'Cheques Pendientes', icon: RequestQuoteIcon, permiso: 'VER_INICIO_CHEQUES_PENDIENTES' },
  { title: 'Compromisos Pendientes', icon: ReceiptIcon, permiso: 'VER_INICIO_COMPROMISOS_PENDIENTES' },
  { title: 'Viajes Pendientes de Aprobación', icon: DepartureBoardIcon, permiso: 'VER_INICIO_VIAJES_PENDIENTES_APROBACION' },
];

export default function HomePage() {
  const [ cardsData, setCarsData ] = useState([
    { info: 'Cargando...' },
    { info: 'Cargando...' },
    { info: 'Cargando...' },
    { info: 'Cargando...' },
    { info: 'Cargando...' },
    { info: 'Cargando...' },
    { info: 'Cargando...' },
    { info: 'Cargando...' },
  ]);
  const [ reload, setReload ] = useState(Math.random());
  const userData = useSelector(state => state.user.data);
  const permisos = useSelector(state => state.user.data.permisos);

  useEffect(() => {
    const apiClient = new ApiClient({ url: API.INICIO });

    apiClient.getAll({
      onSuccess: ({ data }) => {
        const cloneCardsData = deepClone(cardsData);
        cloneCardsData[0].info = `${data.viajes}`;
        cloneCardsData[1].info = `${data.vehiculos}`;
        cloneCardsData[2].info = `${formatNumberToCurrency(data.ventas)}`;
        cloneCardsData[3].info = `${formatNumberToCurrency(data.compras)}`;
        cloneCardsData[4].info = `${formatNumberToCurrency(data.ganancia)}`;
        cloneCardsData[5].info = `${formatNumberToCurrency(data.cheques_pendientes)}`;
        cloneCardsData[6].info = `${formatNumberToCurrency(data.compromisos_pendientes)}`;
        cloneCardsData[7].info = `${data.viajes_pendientes}`;

        setCarsData(cloneCardsData);
      }
    })
  }, [reload]);
  return (
    <Box supressHydrationWarning>
      <Typography variant='h4' align='center'>
        !Bienvenido {userData.givenName}!
        <IconButton aria-label="delete" size="large" onClick={() => setReload(Math.random())}>
          <CachedIcon fontSize="inherit" />
        </IconButton>
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1em',
          justifyContent: 'center'
        }}
        mt={6}
      >
        {permisos && CARDS
          .filter(card => permisos.includes(card.permiso))
          .map(({ title, icon: Icon }, idx) => 
            <Card key={title}>
              <CardContent 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '1em'
                }}
              >
                <Icon fontSize='large' />
                <div>
                  <Typography variant='body2'>
                    {title}
                  </Typography>
                  <Typography>
                    {cardsData[idx].info}
                  </Typography>
                </div>
              </CardContent>
            </Card>)
        }
      </Box>
    </Box>
  );
}
