import { setBackdropState } from "@/store/slices/backdrop";
import store from "@/store/store";
import { logout } from "./auth";
import Swal from "sweetalert2";

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
      backdrop && store.dispatch(setBackdropState(true));

      const response = await fetch(`${this.url}/${this.id || id }`, { credentials: 'include' });

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

  async post({ data, onSuccess, onError, backdrop = true }) {
    let response;
    try {
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
        body: formData
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

      if (response.status === 409) { //se maneja desde otro lado
        backdrop && store.dispatch(setBackdropState(false));
        if (onSuccess) {
          onSuccess(response);
        } else {
          await Swal.fire({
            icon: 'error',
            text: 'Datos en conflicto'
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
        credentials: 'include'
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