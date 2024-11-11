import dayjs from "dayjs";

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const convertTime = (date: Date) => {
  const target = dayjs(date);
  return `${monthList[target.month()]} ${target.date()}, ${target.year()}`;
};
