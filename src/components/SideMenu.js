'use client'

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import Link from 'next/link';

import { DRAWER_WIDTH } from '@/utils/constants';
import { usePathname } from 'next/navigation';

const LINKS = [
  { text: 'Inicio', href: '/dashboard', icon: HomeIcon },
];

function SideMenu() {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: ['48px', '56px', '64px'],
          height: 'auto',
          bottom: 0,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        {LINKS.map(({ text, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton
              component={Link} 
              href={href}
              selected={pathname === href}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideMenu