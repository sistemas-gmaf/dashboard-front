'use client'

import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from '@/img/logo.png';

import { toggleSideMenuState } from '@/store/slices/sidemenu';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logout } from '@/utils/auth';
import { ApiClient } from '@/utils/apiClient';
import { API } from '@/utils/constants';
import { setUserData } from '@/store/slices/user';

export default function Header() {
  const apiClient = new ApiClient({ url: API.PERFIL });
  const dispatch = useDispatch();
  
  const [ displayName, setDisplayName ] = useState((typeof localStorage !== 'undefined') 
    ? (JSON.parse(localStorage.getItem('user.data'))?.displayName || false)
    : false);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ isClient, setIsClient ] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let userDataLocalstorage = false;
    if (typeof localStorage !== 'undefined') {
      userDataLocalstorage = localStorage.getItem('user.data');
    }
    if (Boolean(userDataLocalstorage)) {
      const userDataLocalStorage = JSON.parse(userDataLocalstorage);
      dispatch(setUserData(userDataLocalStorage));
    } else {
      apiClient.getAll({
        onSuccess: data => {
          dispatch(setUserData(data));
          setDisplayName(data.displayName);
        }
      });
    }
  }, []);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      sx={{ zIndex: 2000 }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => logout()}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleSideMenuState())}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'block' }}
          >
            {isClient ? displayName : 'cargando...'}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar>
                <Image src={logoImg} alt='GMAF' width={60} style={{ objectFit: 'fill' }} />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}