export const formatReadableDate = (date) => {
  const transactionDate = formatReactDate(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return transactionDate.toLocaleDateString("en-US", options);
};

export const formatReactDate = (date) => {
  const transactionDate = new Date(
    date[0],
    date[1] - 1,
    date[2],
    date[3],
    date[4],
    date[5]
  );

  return transactionDate;
};
