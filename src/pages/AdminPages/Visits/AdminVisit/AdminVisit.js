import React from "react";
import { useLocation } from "react-router-dom";
import "./AdminVisit.css";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitButton from "../../../../components/VisitButton/VisitButton";
import Recommendation from "../../../../components/Recommendation/Recommendation";
import { visit_info } from "../../../../data/visit_info";
import { recommendation_info } from "../../../../data/recommendation_info";

const AdminVisit = () => {
  const location = useLocation();

  const { visitDate, visitHour } = location.state || {};

  const formattedHour = visitHour.replace(":", "-");

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader />
      <BackArrow title={`Wizyta ${visitDate}`} />

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
            <strong>Weterynarz:</strong> {visit_info.weterynarz}
          </p>
          <p>
            <strong>Numer właściciela:</strong>{" "}
            {visit_info.numer_telefonu_wlasciciela}
          </p>
          <p>
            <strong>Numer weterynarza:</strong>{" "}
            {visit_info.numer_telefonu_weterynarza}
          </p>
          <p>
            <strong>Cena:</strong> {visit_info.cena} zł
          </p>
          <p>
            <strong>Zwierzę:</strong> {visit_info.typ_zwierzecia}{" "}
            {visit_info.imie_zwierzecia}
          </p>
          <p>
            <strong>Rasa:</strong> {visit_info.rasa}
          </p>
          <p>
            <strong>Wiek:</strong> {visit_info.wiek}
          </p>
          <VisitButton
            visitDate={visitDate}
            visitHour={visitHour}
            formData={visit_info}
            modifyPath={`/admin/visits/visit/modify/${visitDate}_${formattedHour}`}
            deletePath={`/admin/visits/visit/delete/${visitDate}_${formattedHour}`}
          />
        </div>
        <Recommendation
          recommendation_info={recommendation_info}
          visitDate={visitDate}
          visitHour={visitHour}
          formData={visit_info}
          addPath={`/admin/visits/recommendation/add/${visitDate}_${formattedHour}`}
          modifyPath={`/admin/visits/recommendation/modify/${visitDate}_${formattedHour}`}
          deletePath={`/admin/visits/recommendation/delete/${visitDate}_${formattedHour}`}
        />
      </div>
    </div>
  );
};

export default AdminVisit;
