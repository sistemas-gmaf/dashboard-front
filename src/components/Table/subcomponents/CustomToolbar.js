import { Box, Button } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

export default function CustomToolbar({ createRoute, disableCreate }) {
  return (
    <GridToolbarContainer sx={{ 
      display: 'flex', 
      padding: '.5em', 
      justifyContent: !disableCreate ? 'space-between' : 'flex-start',
      flexDirection: {
        xs: 'column-reverse',
        sm: 'initial'
      }
    }}>
      <GridToolbarQuickFilter
        InputProps={{ placeholder: 'Buscar...' }}
      />
      <Box 
        sx={{
          display: {
            xs: 'flex',
            md: 'initial'
          }
        }}
      >
        {!disableCreate && <Button
          fullWidth
          color='secondary'
          href={createRoute}
          LinkComponent={Link}
          variant="contained"
          size="small"
          endIcon={<AddIcon />}
        >
          Crear Nuevo
        </Button>}
      </Box>
    </GridToolbarContainer>
  );
}