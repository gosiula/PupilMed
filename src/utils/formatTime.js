export const formatTime = (time) => {
    if (!time) return "";
  
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };
  