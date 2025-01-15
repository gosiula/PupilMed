import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OwnerSuccess.css";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import Success from "../../../components/Success/Success";

function OwnerSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message;
  const navigateTo = location.state?.navigateTo;

  useEffect(() => {
    if (!message || !navigateTo) {
      navigate("/error");
    }
  }, [message, navigateTo]);

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <Success navigateTo={navigateTo} message={message} />
    </div>
  );
}

export default OwnerSuccess;
