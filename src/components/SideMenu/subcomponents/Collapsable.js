import { Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Collapsable({ text, icon: Icon, children, permisosHijos }) {
  const sideMenuOpen = useSelector(state => state.sidemenu.open);
  const permisos = useSelector(state => state.user.data.permisos);
  const [ open, setOpen ] = useState(false);

  return (
    permisosHijos.some(permiso => permisos.includes(permiso)) ? <ListItem
      key={text} 
      disablePadding 
      sx={{ display: 'block' }}
    >
      <Tooltip key={text} title={text} placement='right' disableHoverListener={sideMenuOpen}>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText 
            sx={{ 
              opacity: sideMenuOpen ? 1 : 0,
              '& span': {
                whiteSpace: 'pre',
                textOverflow: 'ellipsis',
              }
            }} 
            primary={text} 
          />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </Tooltip>
      <Collapse in={open} timeout='auto' sx={{ padding: sideMenuOpen ? '0 1em' : '0' }}>
        {children}
      </Collapse>
    </ListItem> : <></>
  )
}
