import { ApiClient } from '@/utils/ApiClient';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaginationModelState, setSortModelState } from '@/store/slices/tables';
import { deepClone } from '@/utils/deepClone';

export const useTable = ({ url, section }) => {
  const apiClient = new ApiClient({ url });

  const { paginationModel, sortModel } = useSelector(state => state.tables[section]);
  const dispatch = useDispatch();

  const [ rows, setRows ] = useState([]);
  const [ reloadTable, setReloadTable ] = useState(Math.random());

  useEffect(() => {
    apiClient.getAll({ onSuccess: setRows });
  }, [reloadTable]);

  const reloadDataTable = () => setReloadTable(Math.random());
  
  const deleteCallback = id => apiClient.delete({ id, onSuccess: reloadDataTable });

  const onPaginationModelChange= model => dispatch(setPaginationModelState({ section, model }));
  const onSortModelChange = model => dispatch(setSortModelState({ section, model }));
  const onFilterModelChange = model => sessionStorage.setItem(section + '/filter/model', JSON.stringify(model));

  return { 
    rows, 
    deleteCallback,
    persistentTable: {
      initialState: {
        pagination: { paginationModel: deepClone(paginationModel) }, 
        sorting: { sortModel: deepClone(sortModel) }, 
        filter: { filterModel: JSON.parse(sessionStorage.getItem(section + '/filter/model')) },
      }, 
      onPaginationModelChange,
      onSortModelChange,
      onFilterModelChange
    }
  };
}