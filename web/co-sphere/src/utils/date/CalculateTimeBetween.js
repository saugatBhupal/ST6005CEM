export function calculateTimeBetween(t1, t2) {
  const from = new Date(t1);
  const to = new Date(t2);

  const timeDifferenceInMilliseconds = from - to;

  const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hour`;
  } else if ((minutes > 0) & minutes) {
    return `${minutes} minutes`;
  } else {
    return `Just a moment`;
    // return `${seconds} second(s) ago`;
  }
}
