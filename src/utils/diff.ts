import type { Timestamp } from "firebase/firestore";

export const getMinutes = (createdAt: Timestamp) => {
  const todayDate = new Date().valueOf();
  const _createdAt = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 100000
  );

  const createdDate = new Date(_createdAt).valueOf();

  console.log({ _createdAt });

  const totalSeconds = (todayDate - createdDate) / 1000;
  const minutesDifference = totalSeconds / 60;

  return minutesDifference;
};
