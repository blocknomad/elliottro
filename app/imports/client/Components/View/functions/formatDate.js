export default function formatDate(date, timeframe) {
  let text;

  date = new Date(date);

  switch (timeframe) {
    case "M1":
      text = date.toLocaleDateString(false, {
        timeZone: "UTC",
        month: "long",
        year: "numeric",
      });
      break;
    case "W1":
    case "D3":
    case "D1":
      text = date.toLocaleDateString(false, {
        timeZone: "UTC",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      break;
    default:
      text = date.toLocaleDateString(false, {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  }

  return text;
}
