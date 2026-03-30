export function formatDateLabel(isoString) {
  const inputDate = new Date(isoString);

  const today = new Date();
  const tomorrow = new Date();
  const yesterday = new Date();

  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  // Normalize time (ignore hours/minutes)
  const normalize = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const input = normalize(inputDate);
  const todayTime = normalize(today);
  const tomorrowTime = normalize(tomorrow);
  const yesterdayTime = normalize(yesterday);

  if (input === todayTime) return "Today";
  if (input === tomorrowTime) return "Tomorrow";
  if (input === yesterdayTime) return "Yesterday";

  // fallback: YYYY-MM-DD
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};



export function formatTime12Hour(isoString) {
  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // convert 0 -> 12

  return `${hours}:${minutes} ${ampm}`;
}