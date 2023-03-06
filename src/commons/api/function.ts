export const roundNumber = (number: number) => {
  if (Number.isInteger(number)) return number;
  const temp = number;
  return Math.round(temp * 10000000000) / 10000000000;
};

export const removeZeros = (number: number) => {
  if (isNaN(number)) return 0; // 입력값이 숫자가 아니면 0을 반환
  const temp = number;
  console.log(temp);
  const newNum = String(temp).replace(/(^0+(?!$))/, "");
  console.log("newNum", newNum);
  return Number(newNum);
};
