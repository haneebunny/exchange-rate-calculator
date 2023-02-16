export const roundNumber = (number: number) => {
  const temp = number;
  return Math.round(temp * 10000000000) / 10000000000;
};

export const removeZeros = (number: number) => {
  if (number < 1) return number;
  const temp = number;
  const newNum = String(temp).replace(/(^0+(?!$))/, "");
  return newNum;
};
