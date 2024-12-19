import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import OwnerHeader from "./OwnerHeader";

import "./Owner.css";
import "../OwnerAndVet.css";

function OwnerLogout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("isLoggedIn"));

  // obsługa wylogowania
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>

        <OwnerHeader />

        <p className="text1">Wylogowanie</p>

        <div className="buttons-header">
          <div className="logout-container">
            <button className="logout-button" onClick={handleLogout}>
              Wyloguj się
            </button>
          </div>
        </div>
        </div>
        );
}
export default OwnerLogout;
