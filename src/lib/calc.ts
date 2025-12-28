export const calculateMonthlyPercentageIncrease = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  const increase = current - previous;
  const percentageIncrease = (increase / previous) * 100;
  return Number(percentageIncrease.toFixed(2));
};

export const getCurrentMonthStart = () => {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getPreviousMonthStart = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
};
