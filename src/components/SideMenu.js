'use client'

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import Link from 'next/link';

import { DRAWER_WIDTH, DRAWER_WIDTH_CLOSED } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

const LINKS = [
  { text: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { text: 'Transportes', href: '/dashboard/transportes', icon: LocalShippingIcon },
  { text: 'Vehículos', href: '/dashboard/vehiculos', icon: DirectionsCarFilledIcon },
  { text: 'Choferes', href: '/dashboard/choferes', icon: AirlineSeatReclineExtraIcon },
  { text: 'Viajes', href: '/dashboard/viajes', icon: EmojiTransportationIcon },
  { text: 'Tarifarios', href: '/dashboard/tarifarios', icon: ReceiptLongIcon },
  { text: 'Clientes', href: '/dashboard/clientes', icon: PeopleAltIcon },
  { text: 'Cheques', href: '/dashboard/cheques', icon: LocalAtmIcon },
  { text: 'Compromisos', href: '/dashboard/compromisos', icon: ReceiptIcon },
  { text: 'Alertas', href: '/dashboard/alertas', icon: NotificationsIcon },
  { text: 'Gestión de Usuarios', href: '/dashboard/usuarios', icon: SupervisedUserCircleIcon },
];

function SideMenu() {
  const sideMenuOpen = useSelector(state => state.sidemenu.open);
  const pathname = usePathname();

  return (
    <Drawer 
      variant="permanent" 
      open={sideMenuOpen}
      sx={{
        width: sideMenuOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px`,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          overflowX: 'hidden',
          width: sideMenuOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px`,
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          boxSizing: 'border-box',
          top: ['48px', '56px', '64px'],
          height: 'auto',
          bottom: 0,
        },
      }}
    >
      <List>
        {LINKS.map(({text, href, icon: Icon}) => (
          <ListItem 
            key={text} 
            disablePadding 
            sx={{ display: 'block' }}
          >
            <ListItemButton
              component={Link}
              href={href}
              selected={href === pathname}
              sx={{
                width: sideMenuOpen ? 'initial': `${DRAWER_WIDTH_CLOSED}px`,
                maxHeight: '48px'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sideMenuOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                sx={{ 
                  opacity: sideMenuOpen ? 1 : 0,
                  '& span': {
                    whiteSpace: 'pre',
                    textOverflow: 'ellipsis',
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideMenu