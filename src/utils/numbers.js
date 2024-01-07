export const formatNumberToCurrency = (number) => {
  const formatter = Intl.NumberFormat('es-AR', {style:'currency', currency: 'ARS'});
  return formatter.format(number);
}