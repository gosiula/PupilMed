import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./Owner.css";
import "./OwnerAndVet.css";

// przykładowy użytkownik
const owner_info = {
  imie: "Maja",
  nazwisko: "Kowalska",
  numer_tel: "222222222",
  rodzaj: "Pies",
  imie_zwierzecia: "Bubuś",
  rasa: "Owczarek niemiecki",
  wiek: "6 lat",
  uwagi: "Uczulony na orzechy.",
};

function OwnerAccount() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
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
          className="current-button"
          onClick={() => navigate("/owneraccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/ownerlogout")}
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

      <p className="text1">Konto użytkownika</p>

      <div className="owner-info-container">
        <div className="owner-info-section">
          <div className="owner-info-left">
            <p className="green-header">Imię i nazwisko</p>
            <p className="owner-info-text">
              {owner_info.imie} {owner_info.nazwisko}
            </p>
          </div>

          <div className="owner-info-right">
            <p className="green-header">Numer telefonu</p>
            <p className="owner-info-text">{owner_info.numer_tel}</p>
          </div>
        </div>
      </div>

      <div className="owner-info-container">
        <div className="owner-info-section">
          <div className="owner-info-left">
            <p className="green-header">Rodzaj zwierzęcia i imię</p>
            <p className="owner-info-text">
              {owner_info.rodzaj} {owner_info.imie_zwierzecia}
            </p>
          </div>

          <div className="owner-info-right">
            <p className="green-header">Rasa zwierzęcia</p>
            <p className="owner-info-text">{owner_info.rasa}</p>
          </div>
        </div>
      </div>

      <div className="owner-info-container">
        <div className="owner-info-section">
          <div className="owner-info-left">
            <p className="green-header">Dodatkowe informacje</p>
            <p className="owner-info-text">{owner_info.uwagi}</p>
          </div>
          <div className="owner-info-right">
            <p className="green-header">Wiek zwierzęcia</p>
            <p className="owner-info-text">{owner_info.wiek}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerAccount;
