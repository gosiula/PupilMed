import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "../OwnerAndVet.css";
import "./Vet.css";

// przykładowy użytkownik
const vet_info = {
  imie: "Maja",
  nazwisko: "Kowalska",
  numer_tel: "222222222",
  nazwa_kliniki: "Pupilkowo",
  adres_kliniki: "Sienkiewicza 10, Warszawa",
};

function VetAccount() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="owner-button" onClick={() => navigate("/vet")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="current-button"
          onClick={() => navigate("/vetaccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button className="owner-button" onClick={() => navigate("/vetlogout")}>
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
              {vet_info.imie} {vet_info.nazwisko}
            </p>
          </div>

          <div className="owner-info-right">
            <p className="green-header">Nazwa kliniki</p>
            <p className="owner-info-text">{vet_info.nazwa_kliniki}</p>
          </div>
        </div>
      </div>

      <div className="owner-info-container">
        <div className="owner-info-section">
          <div className="owner-info-left">
            <p className="green-header">Numer telefonu</p>
            <p className="owner-info-text">{vet_info.numer_tel}</p>
          </div>

          <div className="owner-info-right">
            <p className="green-header">Adres kliniki</p>
            <p className="owner-info-text">{vet_info.nazwa_kliniki}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetAccount;
