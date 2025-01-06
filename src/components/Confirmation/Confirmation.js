import React from "react";
import "./Confirmation.css";

const Confirmation = ({ onConfirm, title }) => {
  const handleConfirm = () => {
    localStorage.clear();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="confirmation-container">
      <p className="text3">{title}</p>
      <button className="confirm-button" onClick={handleConfirm}>
        Potwierdź
      </button>
    </div>
  );
};

export default Confirmation;
