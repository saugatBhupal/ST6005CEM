export function calculateTimeDifference(time) {
  const now = new Date();
  const mongoDate = new Date(time);

  const timeDifferenceInMilliseconds = now - mongoDate;

  const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day ago`;
  } else if (hours > 0) {
    return `${hours} hour ago`;
  } else if ((minutes > 0) & minutes) {
    return `${minutes} minutes ago`;
  } else {
    return `Just a moment ago`;
    // return `${seconds} second(s) ago`;
  }
}
