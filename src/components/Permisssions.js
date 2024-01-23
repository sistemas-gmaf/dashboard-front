import { Box, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, Typography } from "@mui/material";

export default function Permissions({ permisos, permisosStatus, setPermisos, rolesPermisos, keySelect }) {
  return (<>
    <FormControl fullWidth>
      <InputLabel id="roles-label">Selecciona Permisos x Rol</InputLabel>
      <Select
        labelId="roles-label"
        id="roles"
        label="Selecciona Permisos x Rol"
        fullWidth
        key={keySelect}
        onChange={e => {
          const permisosDesactivados = permisos.reduce((acc, permiso) => {
            acc[permiso.id] = false;
            return acc;
          }, {});
          setPermisos({ ...permisosDesactivados, ...e.target.value });
        }}
      >
        <MenuItem value={{}}><em>DESELECCIONAR TODOS</em></MenuItem>
        {
          Object.keys(rolesPermisos).map(rol =>
            <MenuItem key={rol} value={rolesPermisos[rol]}>{rol}</MenuItem>
          )
        }
      </Select>
    </FormControl>
    <Typography>Selecciona Permisos:</Typography>
    <Box
      sx={{ maxHeight: '50vh', overflowY: 'scroll' }}
    >
      {
        permisos?.map(permiso => 
          <FormGroup key={permiso.id}>
            <FormControlLabel 
              control={<Switch 
                checked={permisosStatus[permiso.id]}
                onChange={e => setPermisos({ ...permisosStatus, [permiso.id]: e.target.checked })}
              />} 
              label={permiso.descripcion} 
            />
          </FormGroup>  
        )
      }
    </Box>
  </>)
}

