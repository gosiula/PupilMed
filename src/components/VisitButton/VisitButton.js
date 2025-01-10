import React from "react";
import { useNavigate } from "react-router-dom";
import "./VisitButton.css";

const VisitButtons = ({ visitID, formData, modifyPath, deletePath }) => {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <button
        className="visit-button"
        onClick={() => {
          navigate(modifyPath, { state: { formData, visitID } });
        }}
      >
        Modyfikuj wizytę
      </button>
      <button
        className="visit-button"
        onClick={() => {
          navigate(deletePath, {
            state: { formData, visitID },
          });
        }}
      >
        Usuń wizytę
      </button>
    </div>
  );
};

export default VisitButtons;
