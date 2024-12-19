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

// przykładowy użytkownik
const owner_info = {
  imie: "Maja",
  nazwisko: "Kowalska",
  numer_tel: "333333333"
};

function OwnerAccount() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />

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
    </div>
  );
}

export default OwnerAccount;
