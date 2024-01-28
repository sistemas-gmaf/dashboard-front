export const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    let result = JSON.parse(localStorage.getItem(key));
    if (result === 'true') {
      result = true;
    }
    if (result === 'false') {
      result = false;
    }
    return result;
  }
}