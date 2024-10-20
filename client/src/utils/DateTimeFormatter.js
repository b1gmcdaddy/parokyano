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

export default {
  formatTime,
  formatDate,
};
