import React from "react";
import { GoHeartFill } from "react-icons/go";
import { IoPaw } from "react-icons/io5";
import "./LogoContainer.css";

const LogoContainer = () => (
  <div className="logo-container">
    <p className="logo-text">PupilMed</p>
    <div className="heart-with-paw">
      <GoHeartFill className="heart-icon" />
      <IoPaw className="paw-icon" />
    </div>
  </div>
);

export default LogoContainer;
