import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import "../../OwnerAndVet.css";
import "../Admin.css";
import AdminHeader from "../AdminHeader";

const visit_info = {
  godzina: "14:30",
  typ_wizyty: "konsultacja",
  wlasciciel: "Maria Kowalska",
  numer_tel: "123123132",
  cena: 100,
  zwierze: "Pies Bubuś",
  rasa: "Owczarek Niemiecki",
  wiek: "6 lat",
};

const recommendation_info = {
  zalecenie:
    "Podawać leki przez 3 tygodnie. Zapisać się na wizytę kontrolną za miesiąc.",
};

function AdminVisit() {
  const navigate = useNavigate();
  const location = useLocation();

  const { visitDate, visitHour } = location.state || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>

      <AdminHeader />

      <div className="header-container">
        <button className="back-button" onClick={() => navigate("/admin")}>
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">Wizyta {visitDate}</p>
      </div>

      <div className="info-container">
        <div className="visit-info">
          <p className="visit-date-info2">Informacje o wizycie:</p>
          <p>
            <strong>Godzina:</strong> {visitHour}
          </p>
          <p>
            <strong>Typ wizyty:</strong> {visit_info.typ_wizyty}
          </p>
          <p>
            <strong>Właściciel:</strong> {visit_info.wlasciciel}
          </p>
          <p>
            <strong>Numer właściciela:</strong> {visit_info.numer_tel}
          </p>
          <p>
            <strong>Cena:</strong> {visit_info.cena} zł
          </p>
          <p>
            <strong>Zwierzę:</strong> {visit_info.zwierze}
          </p>
          <p>
            <strong>Rasa:</strong> {visit_info.rasa}
          </p>
          <p>
            <strong>Wiek:</strong> {visit_info.wiek}
          </p>
          <div className="button-container">
            <button
              className="visit-button"
              onClick={() => {
                navigate("/admin-modify-visit", {
                  state: { visitDate, visitHour },
                });
              }}
            >
              Modyfikuj wizytę
            </button>

            <button
              className="visit-button"
              onClick={() => {
                navigate("/admin-confirm-delete-visit", {
                  state: { visitDate, visitHour },
                });
              }}
            >
              Usuń wizytę
            </button>
          </div>
        </div>

        <div className="visit-info">
          <p className="visit-date-info2">Zalecenia:</p>
          {recommendation_info.zalecenie ? (
            <>
              <p>{recommendation_info.zalecenie}</p>
              <div className="button-container">
                <button
                  className="recommendation-button"
                  onClick={() => {
                    navigate("/admin-modify-recommendation", {
                      state: { visitDate, visitHour },
                    });
                  }}
                >
                  Modyfikuj zalecenie
                </button>
                <button
                  className="recommendation-button"
                  onClick={() => {
                    navigate("/admin-confirm-delete-recommendation", {
                      state: { visitDate, visitHour },
                    });
                  }}
                >
                  Usuń zalecenie
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Brak dodanych zaleceń.</p>

              <div className="button-container">
                <button
                  className="recommendation-button"
                  onClick={() => {
                    navigate("/admin-add-recommendation", {
                      state: { visitDate, visitHour },
                    });
                  }}
                >
                  Dodaj zalecenie
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminVisit;
