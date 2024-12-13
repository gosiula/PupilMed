import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import "./OwnerAndVet.css";
import "./Vet.css";

function VetConfirmAddVisit() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData || {};

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

      <div className="header-container">
        <button
          className="back-button"
          onClick={() => navigate("/vetaddvisit")}
        >
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">Potwierdzenie</p>
      </div>

      <div className="confirmation-container">
        <p className="text3">
          Czy na pewno chcesz dodać nową wizyte w dniu {formData.datawizyty} o
          godzinie {formData.godzinawizyty} dla numeru telefonu{" "}
          {formData.numertelefonu}?
        </p>

        <button
          className="confirm-button"
          onClick={() => {
            navigate("/vetsuccess", {
              state: { message: "Sukces! Wizyta została dodana!" },
            });
          }}
        >
          Potwierdź
        </button>
      </div>
    </div>
  );
}

export default VetConfirmAddVisit;
