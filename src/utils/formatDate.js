export const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";
  };