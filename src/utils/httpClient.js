import { setBackdropState } from "@/store/slices/backdrop";
import store from "@/store/store";

/**
 * @desc HTTP GET
 * 
 * @param {string} url
 * @param {function} onSuccess
 * @param {function} onError
 */
export async function get({ url, onSuccess, onError }) {
  try {
    store.dispatch(setBackdropState(true));
    
    const response = await fetch(url);
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

/**
 * @desc HTTP PATCH
 * 
 * @param {string} url
 * @param {object} data
 * @param {function} onSuccess
 * @param {function} onError
 */
export async function patch({ url, data, onSuccess, onError }) {
  try {
    store.dispatch(setBackdropState(true));
    
    await fetch(url, {
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

/**
 * @desc HTTP POST
 * 
 * @param {string} url
 * @param {object} data
 * @param {function} onSuccess
 * @param {function} onError
 */
export async function post({ url, data, onSuccess, onError }) {
  try {
    store.dispatch(setBackdropState(true));
    
    await fetch(url, {
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

/**
 * @desc HTTP DELETE
 * 
 * @param {string} url
 * @param {object} data
 * @param {function} onSuccess
 * @param {function} onError
 */
export async function del({ url, onSuccess, onError }) {
  try {
    store.dispatch(setBackdropState(true));
    
    await fetch(url, {
      method: 'DELETE'
    });

    store.dispatch(setBackdropState(false));
    if (onSuccess) {
      onSuccess();
    } else {
      alert('Borrado con éxito')
    }
  } catch (error) {
    store.dispatch(setBackdropState(false));

    if (onError) {
      onError();
    } else {
      alert('Error al borrar datos');
    }
  }
}