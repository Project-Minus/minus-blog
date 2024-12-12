import dayjs from "dayjs";

export const convertTime = (date: Date) => {
  const createdAt = dayjs(date);
  const now = dayjs(new Date());

  const diffInSeconds = now.diff(createdAt, "second"); // 초
  const diffInMinutes = now.diff(createdAt, "minute"); // 분
  const diffInHours = now.diff(createdAt, "hour"); // 시간
  const diffInDays = now.diff(createdAt, "day"); // 일

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }
  return createdAt.format("YYYY.MM.DD");
};
