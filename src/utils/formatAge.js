export const formatAge = (age) => {
    if (typeof age !== "number" || age < 0) return "";
  
    const ostatniaCyfra = age % 10;
    const przedostatniaCyfra = Math.floor((age % 100) / 10);
  
    if (przedostatniaCyfra === 1) {
      return `${age} lat`;
    }
  
    if (ostatniaCyfra === 1) {
      return `${age} rok`;
    } else if (ostatniaCyfra >= 2 && ostatniaCyfra <= 4) {
      return `${age} lata`;
    } else {
      return `${age} lat`;
    }
  };
  