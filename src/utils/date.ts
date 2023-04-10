export const addMinutes = (date: Date | number, minutes: number): Date => {
  const d = typeof date === "number" ? date : dateToEpoch(date);
  const time = d + minutes * 60 * 1000;
  return new Date(time);
};

export const dateToEpoch = (date: Date): number => {
  return date.getTime();
};
