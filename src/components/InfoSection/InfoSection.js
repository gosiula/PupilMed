import React from "react";
import { useNavigate } from "react-router-dom";
import "./InfoSection.css";

const InfoSection = ({
  leftData,
  rightData,
  buttonText,
  isButton,
  navigateTo,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className="vet-info-container">
      <div className="vet-info-section">
        <div className="vet-info-left">
          <p className="vet-green-header">{leftData.header}</p>
          <p className="vet-info-text">{leftData.value}</p>
        </div>

        <div className="vet-info-right">
          <p className="vet-green-header">{rightData.header}</p>
          <p className="vet-info-text">{rightData.value}</p>
        </div>

        {isButton && (
          <button
            className="vet-change-password-button"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
