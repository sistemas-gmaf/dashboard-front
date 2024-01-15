export const getFromStorage = (key) => {
  return window?.localStorage?.getItem(key) ? JSON.parse(localStorage.getItem(key)) : false
}