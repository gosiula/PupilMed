import React from "react";
import { TbFaceIdError } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Paws from "../../components/Paws/Paws";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="error-page-container">
        <div className="error-page-message">
          <p className="error-page-text">
            Wystąpił błąd podczas ładowania strony
          </p>
          <TbFaceIdError className="error-page-icon" />
        </div>
        <button className="error-page-back-button" onClick={handleBack}>
          Cofnij do strony początkowej
        </button>
      </div>
      <Paws />
    </div>
  );
}

export default ErrorPage;
