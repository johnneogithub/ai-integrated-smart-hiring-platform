export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const formatDayLabel = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return date.toLocaleDateString();
};
