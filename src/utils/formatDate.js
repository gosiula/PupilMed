export const formatDate = (date) => {
  if (!date) return "";
  
  const validDate = date instanceof Date ? date : new Date(`${date}T00:00:00`);

  console.log(validDate);
  
  if (isNaN(validDate)) {
    console.error("Invalid date format:", date);
    return "Nieprawidłowa data";
  }

  console.log(validDate.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }))

  return validDate.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
