'use client'

import { Accordion, AccordionDetails, AccordionSummary, Drawer, List } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

import CarCrashIcon from '@mui/icons-material/CarCrash';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

import BackupTableIcon from '@mui/icons-material/BackupTable';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import BallotIcon from '@mui/icons-material/Ballot';

import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptIcon from '@mui/icons-material/Receipt';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import NotificationsIcon from '@mui/icons-material/Notifications';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import { DRAWER_WIDTH, DRAWER_WIDTH_CLOSED } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSideMenuState } from '@/store/slices/sidemenu';
import { getFromStorage } from '@/utils/localStorage';

import Item from './subcomponents/Item';
import Collapsable from './subcomponents/Collapsable';

/* const LINKS = [
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
]; */

function SideMenu() {
  const sideMenuOpenFromStorage = getFromStorage('sidemenu.open');
  const sideMenuOpen = useSelector(state => state.sidemenu.open);
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
        <Item text='Inicio' href='/dashboard/inicio' icon={HomeIcon} permiso='VER_INICIO'/>
        <Collapsable text='Transporte' icon={CarCrashIcon} permisosHijos={['VER_CHOFERES', 'VER_VEHICULOS']}>
          <Item text='Choferes' href='/dashboard/choferes' icon={AirlineSeatReclineExtraIcon} permiso='VER_CHOFERES'/>
          <Item text='Vehículos' href='/dashboard/vehiculos' icon={DirectionsCarFilledIcon} permiso='VER_VEHICULOS'/>
        </Collapsable>
        <Collapsable text='Despacho' icon={BackupTableIcon} permisosHijos={['VER_VIAJES']}>
          <Item text='Viajes' href='/dashboard/viajes' icon={EmojiTransportationIcon} permiso='VER_VIAJES'/>
        </Collapsable>
        <Collapsable text='Contactos' icon={PermContactCalendarIcon} permisosHijos={['VER_CLIENTES', 'VER_TRANSPORTES']}>
          <Item text='Clientes' href='/dashboard/clientes' icon={PeopleAltIcon} permiso='VER_CLIENTES'/>
          <Item text='Transportes' href='/dashboard/transportes' icon={LocalShippingIcon} permiso='VER_TRANSPORTES'/>
        </Collapsable>
        <Collapsable text='Administración' icon={BallotIcon} permisosHijos={['VER_CHEQUES', 'VER_TARIFARIOS']}>
          {/* <Collapsable text='Ingresos' icon={PointOfSaleIcon} permisosHijos={['VER_COMPROMISOS']}>
            <Item text='Compromisos' href='/dashboard/compromisos' icon={ReceiptIcon} permiso='VER_COMPROMISOS'/>
          </Collapsable> */}
          <Collapsable text='Gastos' icon={RequestQuoteIcon} permisosHijos={['VER_COMPROMISOS']}>
            <Item text='Compromisos' href='/dashboard/compromisos' icon={ReceiptIcon} permiso='VER_COMPROMISOS'/>
          </Collapsable>
          <Item text='Cheques' href='/dashboard/cheques' icon={LocalAtmIcon} permiso='VER_CHEQUES'/>
          <Item text='Tarifarios' href='/dashboard/tarifarios' icon={ReceiptLongIcon} permiso='VER_TARIFARIOS'/>
        </Collapsable>
        <Item text='Recordatorios' href='/dashboard/recordatorios' icon={NotificationsIcon} permiso='VER_RECORDATORIOS'/>
        <Item text='Gestión de Usuarios' href='/dashboard/usuarios' icon={SupervisedUserCircleIcon} permiso='VER_GESTION_USUARIOS'/>
      </List>
    </Drawer>
  )
}

export default SideMenu