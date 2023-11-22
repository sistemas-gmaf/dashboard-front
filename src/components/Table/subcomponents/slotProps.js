export const slotProps = {
  MuiTablePagination: {
    labelDisplayedRows: ({ from, to, count }) =>
      `${from} - ${to} de ${count}`,
  },
};