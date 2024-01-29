'use client'

import { Box, Card, CardContent, Typography } from '@mui/material';

import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ApiClient } from '@/utils/apiClient';
import { API } from '@/utils/constants';
import { deepClone } from '@/utils/deepClone';
import { formatNumberToCurrency } from '@/utils/numbers';

const CARDS = [
  { title: 'Viajes Realizados', info: 'Cargando...', icon: EmojiTransportationIcon },
  { title: 'Vehículos Utilizados', info: 'Cargando...', icon: DirectionsCarFilledIcon },
  { title: 'Ventas', info: 'Cargando...', icon: SellIcon },
  { title: 'Compras', info: 'Cargando...', icon: ShoppingCartIcon },
  { title: 'Ganancia', info: 'Cargando...', icon: AttachMoneyIcon },
  { title: 'Cheques Pendientes', info: 'Cargando...', icon: RequestQuoteIcon },
  { title: 'Compromisos Pendientes', info: 'Cargando...', icon: ReceiptIcon },
  { title: 'Viajes Pendientes de Aprobación', info: 'Cargando...', icon: DepartureBoardIcon },
];

export default function HomePage() {
  const [ userName, setUserName ] = useState('');
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
  const userData = useSelector(state => state.user.data);

  useEffect(() => {
    const apiClient = new ApiClient({ url: API.INICIO });
    setUserName(userData.givenName)

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
  }, []);
  return (
    <Box>
      <Typography variant='h4' align='center'>
        !Bienvenido {userName}!
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
        {CARDS.map(({ title, info, icon: Icon }, idx) => <Card key={title}>
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
        </Card>)}
      </Box>
    </Box>
  );
}
