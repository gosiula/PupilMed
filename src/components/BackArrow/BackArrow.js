import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BackArrow.css";

const BackArrow = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-icon" />
      </button>
      <p className="header-title">{title}</p>
    </div>
  );
};

export default BackArrow;
