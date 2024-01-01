import { API } from "./constants";

export const login = () => {
  window.location.href = API.LOGIN;
};

export const logout = () => {
  localStorage.removeItem('user.data');
  window.location.href = API.LOGOUT;
}