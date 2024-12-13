import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./OwnerAndVet.css";
import "./Vet.css";

function VetSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = location.state || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="current-button" onClick={() => navigate("/vet")}>
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

      <div className="confirmation-container">
        <p className="text3">{message}</p>
        <button
          className="confirm-button"
          onClick={() => {
            navigate("/vet");
          }}
        >
          Powrót do strony głównej
        </button>
      </div>

      <div className="paw-prints-container">
        <IoPaw className="paw-print paw-print-1" />
        <IoPaw className="paw-print paw-print-3" />
        <IoPaw className="paw-print paw-print-2" />
        <IoPaw className="paw-print paw-print-4" />
      </div>
    </div>
  );
}

export default VetSuccess;
