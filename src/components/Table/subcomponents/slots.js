import { Stack } from "@mui/material";
import CustomToolbar from "./CustomToolbar";

export const slots = ({ disableCreate, createRoute, reloadDataTable }) => ({
  noRowsOverlay: () => (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No hay filas
    </Stack>
  ),
  noResultsOverlay: () => (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Filtros sin resultados disponibles
    </Stack>
  ),
  toolbar: () => 
    <CustomToolbar 
      disableCreate={disableCreate} 
      createRoute={createRoute} 
      reloadDataTable={reloadDataTable} 
    />
});