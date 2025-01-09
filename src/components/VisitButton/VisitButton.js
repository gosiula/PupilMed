import React from "react";
import { useNavigate } from "react-router-dom";
import "./VisitButton.css";

const VisitButtons = ({
                          visitDate,
  visitHour,
  formData, visit,
  modifyPath,
  deletePath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <button
        className="visit-button"
        onClick={() => {
            console.log("Navigate to modifyPath:", modifyPath, visit);
            navigate(modifyPath, { state: { visit } });
        }}
      >
        Modyfikuj wizytę
      </button>
      <button
        className="visit-button"
        onClick={() => {
          navigate(deletePath, {
            state: { visitDate, visitHour, formData },
          });
        }}
      >
        Usuń wizytę
      </button>
    </div>
  );
};

export default VisitButtons;
