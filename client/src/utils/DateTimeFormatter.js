const formatTime = (time24) => {
  let [hour, minute] = time24.split(":");
  hour = parseInt(hour);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${hour}:${minute} ${period}`;
};

const formatDate = (rawDate) => {
  const formatted = new Date(rawDate).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatted;
};

const addOrdinalSuffix = (day) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};

export default {
  formatTime,
  formatDate,
  addOrdinalSuffix
};
