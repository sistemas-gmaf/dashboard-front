import { DRAWER_WIDTH_CLOSED } from '@/utils/constants';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Item({ text, href, icon: Icon, permiso }) {
  const sideMenuOpen = useSelector(state => state.sidemenu.open);
  const permisos = useSelector(state => state.user.data.permisos);
  const pathname = usePathname();

  return (
    permisos.includes(permiso) ? <Tooltip key={text} title={text} placement='right' disableHoverListener={sideMenuOpen}>
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
    : <></>
  )
}
