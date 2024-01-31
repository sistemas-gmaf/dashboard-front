import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

export const Actions = ({ 
  id, 
  customDeleteId, 
  deleteCallback, 
  detailRoute, 
  editRoute, 
  disableDetail, 
  disableEdit, 
  disableDelete,
  editPermission,
  deletePermission
}) => <div>
  {!disableDetail && <IconButton href={`${detailRoute}/${id}`} LinkComponent={Link}>
    <VisibilityIcon />
  </IconButton>}
  {!disableEdit && editPermission && <IconButton href={`${editRoute}/${id}`} LinkComponent={Link}>
    <EditIcon />
  </IconButton>}
  {!disableDelete && deletePermission && <IconButton onClick={() => deleteCallback(customDeleteId || id)}>
    <DeleteIcon />
  </IconButton>}
</div>