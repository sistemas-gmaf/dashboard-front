import { ApiClient } from '@/utils/ApiClient';
import { useEffect, useState } from 'react';

export const useTable = ({ url }) => {
  const apiClient = new ApiClient({ url });

  const [ rows, setRows ] = useState([]);
  const [ reloadTable, setReloadTable ] = useState(Math.random());

  useEffect(() => {
    apiClient.getAll({ onSuccess: setRows });
  }, [reloadTable]);

  const reloadDataTable = () => setReloadTable(Math.random());
  
  const deleteCallback = id => apiClient.delete({ id, onSuccess: reloadDataTable });

  return { rows, deleteCallback };
}