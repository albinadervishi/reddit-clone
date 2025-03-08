/**
 * @param dateString
 * @returns
 */

export const formatTimeAgo = (dateString: string | Date): string => {
  //parse date string into date object
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  //future dates
  if (seconds < 0) {
    return "just now";
  }

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  //time unit
  if (seconds < minute) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }

  if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }

  if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  if (seconds < week) {
    const days = Math.floor(seconds / day);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }

  if (seconds < month) {
    const weeks = Math.floor(seconds / week);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  if (seconds < year) {
    const months = Math.floor(seconds / month);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(seconds / year);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};

/**
 * @param dateString
 * @returns
 */

export const formatFullDate = (dateString: string | Date): string => {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
