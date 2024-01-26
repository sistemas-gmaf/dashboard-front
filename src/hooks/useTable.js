import { ApiClient } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaginationModelState, setSortModelState } from '@/store/slices/tables';
import { deepClone } from '@/utils/deepClone';
import { DEFAULT_TABLE_FILTERS_MODEL } from '@/utils/constants';

export const useTable = ({ url, section }) => {
  const apiClient = new ApiClient({ url });

  const { paginationModel, sortModel } = useSelector(state => state.tables[section]);
  const dispatch = useDispatch();

  const [ rows, setRows ] = useState([]);
  const [ reloadTable, setReloadTable ] = useState(Math.random());

  useEffect(() => {
    apiClient.getAll({ onSuccess: ({data}) => setRows(data) });
  }, [reloadTable]);

  const reloadDataTable = () => setReloadTable(Math.random());
  
  const deleteCallback = id => apiClient.delete({ id, onSuccess: reloadDataTable });

  const onPaginationModelChange= model => dispatch(setPaginationModelState({ section, model }));
  const onSortModelChange = model => dispatch(setSortModelState({ section, model }));
  const onFilterModelChange = model => sessionStorage.setItem(section + '/filter/model', JSON.stringify(model));

  return { 
    tableKey: reloadTable,
    rows, 
    deleteCallback,
    persistentTable: {
      initialState: {
        pagination: { paginationModel: deepClone(paginationModel) }, 
        sorting: { sortModel: deepClone(sortModel) }, 
        filter: { 
          filterModel: typeof window != 'undefined' 
                          ? JSON.parse(sessionStorage.getItem(section + '/filter/model')) 
                          : DEFAULT_TABLE_FILTERS_MODEL
        },
      }, 
      onPaginationModelChange,
      onSortModelChange,
      onFilterModelChange
    }
  };
}