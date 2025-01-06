import React from "react";
import { useLocation } from "react-router-dom";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitButton from "../../../../components/VisitButton/VisitButton";
import Recommendation from "../../../../components/Recommendation/Recommendation";
import { visit_info } from "../../../../data/visit_info";
import { recommendation_info } from "../../../../data/recommendation_info";
import "./VetVisit.css";

const VetVisit = () => {
  const location = useLocation();

  const { visitDate, visitHour } = location.state || {};

  const formattedHour = visitHour.replace(":", "-");

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
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
            <strong>Numer właściciela:</strong>{" "}
            {visit_info.numer_telefonu_wlasciciela}
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
            modifyPath={`/vet/visits/visit/modify/${visitDate}_${formattedHour}`}
            deletePath={`/vet/visits/visit/delete/${visitDate}_${formattedHour}`}
          />
        </div>
        <Recommendation
          recommendation_info={recommendation_info}
          visitDate={visitDate}
          visitHour={visitHour}
          formData={visit_info}
          addPath={`/vet/visits/recommendation/add/${visitDate}_${formattedHour}`}
          modifyPath={`/vet/visits/recommendation/modify/${visitDate}_${formattedHour}`}
          deletePath={`/vet/visits/recommendation/delete/${visitDate}_${formattedHour}`}
        />
      </div>
    </div>
  );
};

export default VetVisit;
