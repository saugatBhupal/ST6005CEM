export function convertToTime(time) {
  const date = new Date(time);

  const hours = date.getUTCHours() % 12 || 12;
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = date.getUTCHours() < 12 ? "AM" : "PM";

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const ordinal = getOrdinalSuffix(day);

  return `${hours}:${minutes} ${ampm}, ${day}${ordinal} ${month}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

console.log(convertToTime(1721641800000));
