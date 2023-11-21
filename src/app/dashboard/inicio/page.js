import { Box, Card, CardContent, Typography } from '@mui/material';

import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';

/**
 * @todo: ESTO SE DEBE TRAER DEL BACKEND
 */
const CARDS = [
  { title: 'Viajes Realizados', info: '87', icon: EmojiTransportationIcon },
  { title: 'Vehículos Utilizados', info: '37', icon: DirectionsCarFilledIcon },
  { title: 'Ventas', info: '$3.3 mill.', icon: SellIcon },
  { title: 'Compras', info: '$2.7 mill.', icon: ShoppingCartIcon },
  { title: 'Ganancia', info: '$1.16 mill.', icon: AttachMoneyIcon },
  { title: 'Cheques Pendientes', info: '$4.36 mill.', icon: RequestQuoteIcon },
  { title: 'Compromisos Pendientes', info: '$4.13 mill.', icon: ReceiptIcon },
  { title: 'Viajes Pendientes de Aprobación', info: '14', icon: DepartureBoardIcon },
]

export default function HomePage() {
  return (
    <Box>
      <Typography variant='h4' align='center'>
        !Bienvenido Emanuel!
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
        {CARDS.map(({ title, info, icon: Icon }) => <Card key={title}>
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
                {info}
              </Typography>
            </div>
          </CardContent>
        </Card>)}
      </Box>
    </Box>
  );
}
