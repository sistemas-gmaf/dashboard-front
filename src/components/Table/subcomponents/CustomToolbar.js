import { Box, Button, IconButton } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CachedIcon from '@mui/icons-material/Cached';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

export default function CustomToolbar({ createRoute, disableCreate, reloadDataTable }) {
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
          display: 'flex',
          alignItems: 'center',
          gap: 2
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
        <IconButton aria-label="reload" color="secondary" onClick={() => reloadDataTable()}>
          <CachedIcon />
        </IconButton>
      </Box>
    </GridToolbarContainer>
  );
}