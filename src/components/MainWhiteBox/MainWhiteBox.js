import React from "react";
import "./MainWhiteBox.css";

const MainWhiteBox = ({ title, subtitle, children }) => (
  <div className="main-white-box">
    <p className="big-text">{title}</p>
    {subtitle && <p className="big-text">{subtitle}</p>}
    {children}
  </div>
);

export default MainWhiteBox;
