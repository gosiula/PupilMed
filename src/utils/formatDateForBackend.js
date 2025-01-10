export const formatDateForBackend = (date) => {
  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    const [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`;
  }

  throw new Error("Invalid date format");
};
