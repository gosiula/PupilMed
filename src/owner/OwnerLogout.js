import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./Owner.css";
import "../OwnerAndVet.css";

function OwnerLogout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("isLoggedIn"));

  // obsługa wylogowania
  const handleLogout = () => {
    // usuwamy dane logowania
    localStorage.removeItem("isLoggedIn"); // usuwamy informację o logowaniu
    navigate("/"); // przekierowujemy na stronę początkową
  };

  // obsługa zmiany konta zwierzęcia
  const handleSwitchAccount = () => {
    navigate("/ownerchooseanimal");
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      {/* Panel na górze z przyciskami */}
      <div className="owner-header">
        <button className="owner-button" onClick={() => navigate("/owner")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/ownerrecommendations")}
        >
          <GiMedicines className="owner-icon" />
          Zalecenia
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/owneraccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button className="current-button" onClick={handleLogout}>
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

      {user?.zwierzeta && user.zwierzeta.length === 1 && (
        <p className="text1">Wylogowanie</p>
      )}
      {user?.zwierzeta && user.zwierzeta.length > 1 && (
        <p className="text1">Wylogowanie lub zmiana konta pupila</p>
      )}
      <div className="buttons-header">
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            Wyloguj się
          </button>
        </div>
        {user?.zwierzeta && user.zwierzeta.length > 1 && (
          <div className="logout-container">
            <button
              className="change-animal-button"
              onClick={handleSwitchAccount}
            >
              Zmień konto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerLogout;
