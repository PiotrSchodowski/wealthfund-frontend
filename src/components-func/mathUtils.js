import { formatReactDate } from "./dateUtils";

export const calculateResult = (wallet) => {
  const basicValue = wallet.basicValue;
  const actualValue = wallet.actualValue;
  const difference = actualValue - basicValue;
  const result = ((difference / basicValue) * 100).toFixed(2);

  return {
    result: !isNaN(result) ? `${result}` : "0.00",
  };
};

export const calculateProfit = (wallet) => {
  const profit = wallet.actualValue - wallet.basicValue;
  const formattedProfit = profit.toFixed(2);
  return {
    profit: !isNaN(formattedProfit)
      ? profit >= 0
        ? formattedProfit
        : `${formattedProfit}`
      : "0.00",
  };
};

export const roundValue = (value) => {
  return Math.round(value * 100) / 100;
};

export const sumOfWholeValue = (positions, cash) => {
  let sum = 0;
  positions.forEach((position) => {
    sum += position.quantity * position.actualPrice;
  });
  return roundValue(sum + cash);
};

export const calculateDays = (date) => {
  const newDate = formatReactDate(date);
  const today = new Date();
  const timeDifference = today - newDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  return daysDifference;
};

export const calculatePercentage = (value, wholeValue) => {
  return roundValue((value / wholeValue) * 100);
};
