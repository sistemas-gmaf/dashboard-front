'use client'

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { setSideMenuState } from '@/store/slices/sidemenu';
import { getFromStorage } from '@/utils/localStorage';

const LINKS = [
  { text: 'Inicio', href: '/dashboard/inicio', icon: HomeIcon, permiso: 'VER_INICIO' },
  { text: 'Transportes', href: '/dashboard/transportes', icon: LocalShippingIcon, permiso: 'VER_TRANSPORTES' },
  { text: 'Choferes', href: '/dashboard/choferes', icon: AirlineSeatReclineExtraIcon, permiso: 'VER_CHOFERES' },
  { text: 'Vehículos', href: '/dashboard/vehiculos', icon: DirectionsCarFilledIcon, permiso: 'VER_VEHICULOS' },
  { text: 'Clientes', href: '/dashboard/clientes', icon: PeopleAltIcon, permiso: 'VER_CLIENTES' },
  { text: 'Tarifarios', href: '/dashboard/tarifarios', icon: ReceiptLongIcon, permiso: 'VER_TARIFARIOS' },
  { text: 'Viajes', href: '/dashboard/viajes', icon: EmojiTransportationIcon, permiso: 'VER_VIAJES' },
  { text: 'Cheques', href: '/dashboard/cheques', icon: LocalAtmIcon, permiso: 'VER_CHEQUES' },
  { text: 'Compromisos', href: '/dashboard/compromisos', icon: ReceiptIcon, permiso: 'VER_COMPROMISOS' },
  { text: 'Recordatorios', href: '/dashboard/recordatorios', icon: NotificationsIcon, permiso: 'VER_RECORDATORIOS' },
  { text: 'Gestión de Usuarios', href: '/dashboard/usuarios', icon: SupervisedUserCircleIcon, permiso: 'VER_GESTION_USUARIOS' },
];

function SideMenu() {
  const sideMenuOpenFromStorage = getFromStorage('sidemenu.open');
  const sideMenuOpen = useSelector(state => state.sidemenu.open);
  const permisos = useSelector(state => state.user.data.permisos);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSideMenuState(sideMenuOpenFromStorage));
  }, []);

  return (
    <Drawer 
      suppressHydrationWarning
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
          top: '56px',
          height: 'auto',
          bottom: 0,
        },
      }}
    >
      <List>
        {permisos && LINKS.filter(link => permisos.includes(link.permiso)).map(({text, href, icon: Icon}) => (
          <Tooltip key={text} title={text} placement='right' disableHoverListener={sideMenuOpen}>
            <ListItem 
              key={text} 
              disablePadding 
              sx={{ display: 'block' }}
            >
              <ListItemButton
                component={Link}
                href={href}
                selected={pathname.includes(href)}
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
          </Tooltip>
        ))}
      </List>
    </Drawer>
  )
}

export default SideMenu