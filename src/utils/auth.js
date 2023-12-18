import { API } from "./constants";

export const login = () => {
  window.location.href = API.LOGIN;
};

export const logout = () => {
  window.location.href = API.LOGOUT;
}