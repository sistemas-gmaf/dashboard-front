import { setBackdropState } from "@/store/slices/backdrop";
import store from "@/store/store";
import { logout } from "./auth";

export class ApiClient {

  constructor({ url, id }) {
    this.url = url;
    this.id = id || false;
  }

  async getAll({ onSuccess, onError, backdrop = true }) {
    try {
      backdrop && store.dispatch(setBackdropState(true));

      const response = await fetch(this.url, { credentials: 'include' });

      if (response.status === 401) {
        alert('La sesión expiró, debe reiniciar sesión');
        backdrop && store.dispatch(setBackdropState(false));
        return logout();
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();

      backdrop && store.dispatch(setBackdropState(false));
      onSuccess(result);

      return result;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      }
      alert('Error al obtener todos los datos');
    }
  }

  async get({ id, onSuccess, onError, backdrop = true }) {
    try {
      backdrop && store.dispatch(setBackdropState(true));
      
      const response = await fetch(`${this.url}/${this.id || id }`, { credentials: 'include' });

      if (response.status === 401) {
        alert('La sesión expiró, debe reiniciar sesión');
        backdrop && store.dispatch(setBackdropState(false));
        return logout();
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      
      backdrop && store.dispatch(setBackdropState(false));
      onSuccess(result);

      return result;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      }
      alert('Error al obtener datos');
    }
  }

  async patch({ id, data, onSuccess, onError, backdrop = true }) {
    try {
      backdrop && store.dispatch(setBackdropState(true));

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      
      const response = await fetch(`${this.url}/${this.id || id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      });
      
      if (response.status === 401) {
        alert('La sesión expiró, debe reiniciar sesión');
        backdrop && store.dispatch(setBackdropState(false));
        return logout();
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }
  
      backdrop && store.dispatch(setBackdropState(false));

      alert('Datos actualizados con éxito');

      if (onSuccess) {
        onSuccess();
      }
      
      return response;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      }
      alert('Error al actualizar datos');
    }
  }

  async post({ data, onSuccess, onError, backdrop = true }) {
    try {
      backdrop && store.dispatch(setBackdropState(true));

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      
      const response = await fetch(this.url, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.status === 401) {
        alert('La sesión expiró, debe reiniciar sesión');
        backdrop && store.dispatch(setBackdropState(false));
        return logout();
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }
  
      backdrop && store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess();
      } 
      alert('Datos creados con éxito');
      
      return response;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));

      if (onError) {
        onError();
      }
      alert('Error al crear datos');
    }
  }

  async delete({ id, onSuccess, onError, backdrop = true }) {
    try {
      backdrop && store.dispatch(setBackdropState(true));
      
      const response = await fetch(`${this.url}/${this.id || id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.status === 401) {
        alert('La sesión expiró, debe reiniciar sesión');
        backdrop && store.dispatch(setBackdropState(false));
        return logout();
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }
  
      backdrop && store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess();
      }
      alert('Borrado con éxito');
      
      return response;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      }
      alert('Error al borrar datos');
    }
  }

}