import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "../OwnerAndVet.css";
import "./Vet.css";

function VetLogout() {
  const navigate = useNavigate();

  // obsługa wylogowania
  const handleLogout = () => {
    // usuwamy dane logowania
    localStorage.removeItem("isLoggedIn"); // usuwamy informację o logowaniu
    navigate("/"); // przekierowujemy na stronę początkową
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="owner-button" onClick={() => navigate("/vet")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/vetaccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button
          className="current-button"
          onClick={() => navigate("/vetlogout")}
        >
          <MdLogout className="owner-icon" />
          Wyloguj
        </button>
        <div className="logo-container">
          <p className="logo-text">PupilMed</p>
          <div className="heart-with-paw">
            <GoHeartFill className="heart-icon" />
            <IoPaw className="paw-icon" />
          </div>
        </div>
      </div>

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

export default VetLogout;
