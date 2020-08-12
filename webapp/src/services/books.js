export const validateIsbn = isbn => {
  if (isbn.length !== 13 || isbn.substring(0, 3) !== '978') return false;

  // eslint-disable-next-line radix
  const isbnDigit = parseInt(isbn[isbn.length - 1]);
  let multiplier = 0;

  const isbnSum = isbn
    .substring(0, 12)
    .split('')
    .reduce((total, num) => {
      multiplier = multiplier === 1 ? 3 : 1;
      // eslint-disable-next-line radix
      return total + parseInt(num) * multiplier;
    }, 0);

  const validDigit = 10 - (isbnSum % 10);

  return isbnDigit === validDigit;
};
