import { API } from "./constants";

export const login = () => {
  window.location.href = API.LOGIN;
};

export const logout = () => {
  if (process.env.IS_AUTH_BY === 'authorization') {
    localStorage.removeItem('authorization');
    localStorage.removeItem('expires');
  }
  localStorage.removeItem('user.data');
  window.location.href = API.LOGOUT;
}