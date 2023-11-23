import moment from 'moment';
import { ApiClient } from '@/utils/ApiClient';
import { useEffect, useState } from 'react';

export const useForm = ({ url, id, callback }) => {
  const apiClient = new ApiClient({ url });
  const [ formData, setFormData ] = useState({});

  useEffect(() => {
    if (id) {
      apiClient.get({ 
        id, 
        onError: callback,
        onSuccess: data => setFormData(data)
      })
    }
  }, [])

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleCreate = e => {
    e.preventDefault();
    apiClient.post({ 
      data: { 
        ...formData,
        fecha_creacion: moment().format('YYYY-MM-DD') /*@TODO: Esto lo debe manejar el backend*/ 
      }, 
      onSuccess: callback
    });
  }

  const handleEdit = e => {
    e.preventDefault();
    apiClient.patch({ id, data: formData, onSuccess: callback });
  }
  
  let response = { 
    inputProps: { 
      onChange
    } 
  };

  if (id) {
    response = { ...response, formData, handleEdit };
  } else {
    response = { ...response, handleCreate };
  }

  return response;
}