'use client'

import { setBackdropState } from "@/store/slices/backdrop";
import store from "@/store/store";
import { logout } from "./auth";
import Swal from "sweetalert2";

export class ApiClient {

  constructor({ url, id }) {
    this.url = url;
    this.id = id || false;
    if (process.env.IS_AUTH_BY === 'authorization') {
      if (typeof window !== 'undefined') {
        this.expires = localStorage.getItem('expires');
        this.headers = {
          authorization: localStorage.getItem('authorization')
        };
      }
    } else {
      this.expires = undefined;
      this.headers = undefined;
    }
  }

  async getAll({ onSuccess, onError, backdrop = true }) {
    try {
      if (process.env.IS_AUTH_BY === 'authorization' && !this.headers.authorization) {
        return;
      }
      if (
        process.env.IS_AUTH_BY === 'authorization' 
        && (new Date()).getTime() > (new Date(this.expires)).getTime()
        && this.expires) {
        await Swal.fire({
          text: 'La sesión no es válida, debe reiniciar sesión',
          icon: 'info'
        });
        return logout();
      }

      backdrop && store.dispatch(setBackdropState(true));

      const response = await fetch(this.url, { credentials: 'include', headers: this.headers });

      if (response.status === 401) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'La sesión no es válida, debe reiniciar sesión',
          icon: 'info'
        });
        return logout();
      }

      if (response.status === 403) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'No posee permisos para visualizar los datos',
          icon: 'warning'
        });
        return;
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
      
      console.error(error);
  
      if (onError) {
        onError();
      }
      await Swal.fire({
        icon: 'error',
        text: 'Error al obtener todos los datos, oprima F5'
      });
    }
  }

  async get({ id, onSuccess, onError, backdrop = true }) {
    try {
      if (process.env.IS_AUTH_BY === 'authorization' && !this.headers.authorization) {
        return;
      }
      if (
        process.env.IS_AUTH_BY === 'authorization' 
        && (new Date()).getTime() > (new Date(this.expires)).getTime()
        && this.expires) {
        await Swal.fire({
          text: 'La sesión no es válida, debe reiniciar sesión',
          icon: 'info'
        });
        return logout();
      }

      backdrop && store.dispatch(setBackdropState(true));

      const response = await fetch(`${this.url}/${this.id || id }`, { credentials: 'include', headers: this.headers });

      if (response.status === 401) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          icon: 'error',
          text: 'La sesión no es válida, debe reiniciar sesión'
        });
        return logout();
      }

      if (response.status === 403) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'No posee permisos para visualizar los datos',
          icon: 'warning'
        });
        return;
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
      await Swal.fire({
        icon: 'error',
        text: 'Error al obtener todos los datos, oprima F5'
      });
    }
  }

  async patch({ id, data, onSuccess, onError, backdrop = true }) {
    try {
      if (process.env.IS_AUTH_BY === 'authorization' && !this.headers.authorization) {
        return;
      }
      if (
        process.env.IS_AUTH_BY === 'authorization' 
        && (new Date()).getTime() > (new Date(this.expires)).getTime()
        && this.expires) {
        await Swal.fire({
          text: 'La sesión no es válida, debe reiniciar sesión',
          icon: 'info'
        });
        return logout();
      }

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
        body: formData,
        headers: this.headers,
      });
      
      if (response.status === 401) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          icon: 'error',
          text: 'La sesión no es válida, debe reiniciar sesión'
        });
        return logout();
      }

      if (response.status === 403) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'No posee permisos para actualizar los datos',
          icon: 'warning'
        });
        return;
      }

      if (response.status === 409) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'Los datos que intenta ingresar están en conflicto con datos que ya existen',
          icon: 'warning'
        });
        return;
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }
  
      backdrop && store.dispatch(setBackdropState(false));

      await Swal.fire({
        icon: 'success',
        text: 'Datos actualizados con exito'
      });

      if (onSuccess) {
        onSuccess();
      }
      
      return response;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      }

      await Swal.fire({
        icon: 'error',
        text: 'Error al actualizar datos'
      });
    }
  }

  async post({ data, onSuccess, onError, backdrop = true, forceOnSuccess = false }) {
    let response;
    try {
      if (process.env.IS_AUTH_BY === 'authorization' && !this.headers.authorization) {
        return;
      }
      if (
        process.env.IS_AUTH_BY === 'authorization' 
        && (new Date()).getTime() > (new Date(this.expires)).getTime()
        && this.expires) {
        await Swal.fire({
          text: 'La sesión no es válida, debe reiniciar sesión',
          icon: 'info'
        });
        return logout();
      }

      backdrop && store.dispatch(setBackdropState(true));

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      
      response = await fetch(this.url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
        headers: this.headers,
      });

      if (response.status === 401) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          icon: 'error',
          text: 'La sesión no es válida, debe reiniciar sesión'
        });
        return logout();
      }

      if (response.status === 403) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'No posee permisos para enviar los datos',
          icon: 'warning'
        });
        return;
      }

      if (response.status === 409) {
        backdrop && store.dispatch(setBackdropState(false));
        //@TODO: estandarizar todas las peticiones con posibilidad de extender flujos
        if (onSuccess && forceOnSuccess) { //forceOnSuccess se usa como parche por tema de flujo de tarifarios
          onSuccess(response);
        } else {
          await Swal.fire({
            text: 'Los datos que intenta ingresar están en conflicto con datos que ya existen',
            icon: 'warning'
          });
        }
        return;
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }
  
      backdrop && store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess(response);
      } else {
        await Swal.fire({
          icon: 'success',
          text: 'Datos creados con exito'
        });
      }

      
      return response;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));

      if (onError) {
        onError(response);
      } else {
        await Swal.fire({
          icon: 'error',
          text: 'Error al crear datos'
        });
      }
    }
  }

  async delete({ id, onSuccess, onError, backdrop = true }) {
    try {
      if (process.env.IS_AUTH_BY === 'authorization' && !this.headers.authorization) {
        return;
      }
      if (
        process.env.IS_AUTH_BY === 'authorization' 
        && (new Date()).getTime() > (new Date(this.expires)).getTime()
        && this.expires) {
        await Swal.fire({
          text: 'La sesión no es válida, debe reiniciar sesión',
          icon: 'info'
        });
        return logout();
      }

      const userConfirm = await Swal.fire({
        title: '¿Está seguro que desea borrar este registro?',
        confirmButtonText: 'Si, quiero',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        icon: 'question'
      })

      if (!userConfirm.isConfirmed) { return; }
      
      backdrop && store.dispatch(setBackdropState(true));
      
      const response = await fetch(`${this.url}/${this.id || id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.headers,
      });

      if (response.status === 401) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          icon: 'error',
          text: 'La sesión no es válida, debe reiniciar sesión'
        });
        return logout();
      }

      if (response.status === 403) {
        backdrop && store.dispatch(setBackdropState(false));
        await Swal.fire({
          text: 'No posee permisos para eliminar los datos',
          icon: 'warning'
        });
        return;
      }

      if (response.status >= 300 || response.status < 200) {
        throw new Error('Error en la solicitud');
      }
  
      backdrop && store.dispatch(setBackdropState(false));
      if (onSuccess) {
        onSuccess();
      }

      await Swal.fire({
        icon: 'success',
        text: 'Borrado con exito'
      });
      
      return response;
    } catch (error) {
      backdrop && store.dispatch(setBackdropState(false));
  
      if (onError) {
        onError();
      }

      await Swal.fire({
        icon: 'error',
        text: 'Error al borrar datos'
      });
    }
  }

}