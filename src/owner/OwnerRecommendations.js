import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./Owner.css";
import "../OwnerAndVet.css";

// przykładowe zalecenia
const recommendations = [
  {
    data: "2024-12-01",
    content: "Podawać leki przez 3 tygodnie. Umówić konsultację.",
  },
  {
    data: "2024-12-05",
    content: "Używać kropli przez miesiąc. Podawać je rano i wieczorem.",
  },
  { data: "2024-12-10", content: "Umówić kolejną wizytę za pół roku." },
];

function OwnerRecommendations() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="owner-button" onClick={() => navigate("/owner")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="current-button"
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

      <p className="text1">Zalecenia</p>
      {recommendations.map((recommendation, index) => (
        <div key={index} className="recommendation-item">
          <div className="recommendation-details">
            <div className="visit-header">
              <p className="visit-date">Zalecenie {recommendation.data}</p>
              <GiMedicines className="recommendation-icon" />
            </div>
            <p>Informacje od lekarza:</p>
            <p>{recommendation.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OwnerRecommendations;
