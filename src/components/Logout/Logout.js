import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.clear();
    localStorage.removeItem("authData");
    navigate("/");
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        Wyloguj się
      </button>
    </div>
  );
};

export default Logout;
