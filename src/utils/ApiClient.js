import { setBackdropState } from "@/store/slices/backdrop";
import store from "@/store/store";

export class ApiClient {

  constructor({ url, id }) {
    this.url = url;
    this.id = id || false;
  }

  async getAll({ onSuccess, onError }) {
    try {
      store.dispatch(setBackdropState(true));
      
      const response = await fetch(this.url);
      const result = await response.json();
      
      store.dispatch(setBackdropState(false));
      onSuccess(result);
    } catch (error) {
      store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      } else {
        alert('Error al obtener datos');
      }
    }
  }

  async get({ id, onSuccess, onError }) {
    try {
      store.dispatch(setBackdropState(true));
      
      const response = await fetch(`${this.url}/${this.id || id }`);
      const result = await response.json();
      
      store.dispatch(setBackdropState(false));
      onSuccess(result);
    } catch (error) {
      store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      } else {
        alert('Error al obtener datos');
      }
    }
  }

  async patch({ id, data, onSuccess, onError }) {
    try {
      store.dispatch(setBackdropState(true));
      
      await fetch(`${this.url}/${this.id || id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess();
      } else {
        alert('Datos actualizados con éxito')
      }
    } catch (error) {
      store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      } else {
        alert('Error al actualizar datos');
      }
    }
  }

  async post({ data, onSuccess, onError }) {
    try {
      store.dispatch(setBackdropState(true));
      
      await fetch(this.url, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess();
      } else {
        alert('Datos creados con éxito')
      }
    } catch (error) {
      store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      } else {
        alert('Error al crear datos');
      }
    }
  }

  async delete({ id, onSuccess, onError }) {
    try {
      store.dispatch(setBackdropState(true));
      
      await fetch(`${this.url}/${this.id || id}`, {
        method: 'DELETE'
      });
  
      store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess();
      }
      alert('Borrado con éxito')
    } catch (error) {
      store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      } else {
        alert('Error al borrar datos');
      }
    }
  }

}