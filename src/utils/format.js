export const toBRL = (number) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

export const {format: formatPrice} = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
