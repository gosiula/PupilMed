import React from "react";
import { useNavigate } from "react-router-dom";
import Paws from "../Paws/Paws";
import "./Success.css";

const Success = ({ navigateTo, message }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="confirmation-container">
        <p className="text3">{message}</p>
        <button
          className="confirm-success-button"
          onClick={() => navigate(navigateTo)}
        >
          Powrót do strony głównej
        </button>
      </div>
      <Paws />
    </div>
  );
};

export default Success;
