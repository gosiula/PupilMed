import React from "react";
import { useLocation } from "react-router-dom";
import VetHeader from "../../../components/VetHeader/VetHeader";
import Success from "../../../components/Success/Success";
import "./VetSuccess.css";

function VetSuccess() {
  const location = useLocation();

  const message = location.state?.message || {};
  const navigateTo = location.state?.navigateTo || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <Success navigateTo={navigateTo} message={message} />
    </div>
  );
}

export default VetSuccess;
