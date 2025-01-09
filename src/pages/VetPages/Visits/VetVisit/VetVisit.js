import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitButton from "../../../../components/VisitButton/VisitButton";
import Recommendation from "../../../../components/Recommendation/Recommendation";
import { visit_info } from "../../../../data/visit_info";
import "./VetVisit.css";

const VetVisit = () => {
  const location = useLocation();

  const [visit, setVisit] = useState({});
  const [error, setError] = useState("");

  const { visitID } = location.state || {};

  useEffect(() => {
      fetchVisit();
  }, [visitID]);

  const fetchVisit = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      console.log("Token:", token);

      const resp = await fetch(`http://localhost:8080/vet/visit-details?visitID=${visitID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        const errorDetails = await resp.text();
        throw new Error(`Failed to fetch visit: ${resp.status} - ${errorDetails}`);
      }

      const json = await resp.json();

      console.log("Response JSON from the server:", json);
      console.log("Response RESP from the server:", resp);

      setVisit(json);
    } catch (error) {
      console.error("Error fetching visits:", error);
      setError("Niepoprawne dane");
    }
  };
  useEffect(() => {
    console.log("Updated visits:", visit);
    console.log("Updated id:", visitID);
  }, [visit]);

  const formattedHour = visit.hour ? visit.hour.replace(":", "-") : "brak-godziny";

  return (
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
        <VetHeader />
        <BackArrow title={`Wizyta ${visit.date}`} />

        <div className="info-container">
          <div className="visit-info">
            <p className="visit-date-info2">Informacje o wizycie:</p>
            <p>
              <strong>Godzina:</strong> {visit.hour || "Brak godziny"}
            </p>
            <p>
              <strong>Typ wizyty:</strong> {visit.visitType || "Brak danych"}
            </p>
            <p>
              <strong>Właściciel:</strong> {visit.ownerName || "Nieznane imię"}{" "}
              {visit.ownerSurname || "Nieznane nazwisko"}
            </p>
            <p>
              <strong>Numer właściciela:</strong> {visit.ownerPhoneNumber || "Brak numeru"}
            </p>
            <p>
              <strong>Cena:</strong> {visit.price ? `${visit.price} zł` : "Brak danych"}
            </p>
            <p>
              <strong>Zwierzę:</strong> {visit.petType || "Nieznany typ"} {visit.petName || ""}
            </p>
            <p>
              <strong>Rasa:</strong> {visit.petKind || "Brak danych"}
            </p>
            <p>
              <strong>Wiek:</strong> {visit.petAge || "Nieznany wiek"}
            </p>
            <VisitButton
                visitDate={visit.date}
                visitHour={visit.hour}
                formData={visit_info}
                visit={visit}
                modifyPath={`/vet/visits/visit/modify`}
                deletePath={`/vet/visits/visit/delete/${visit.date}_${formattedHour}`}
            />
          </div>
          <Recommendation
              recommendation_info={visit.recommendation ? visit.recommendation.recommendation : null}
              visitDate={visit.date}
              visitHour={visit.hour}
              formData={visit_info}
              addPath={`/vet/visits/recommendation/add/${visit.date}_${formattedHour}`}
              modifyPath={`/vet/visits/recommendation/modify/${visit.date}_${formattedHour}`}
              deletePath={`/vet/visits/recommendation/delete/${visit.date}_${formattedHour}`}
          />
        </div>
      </div>
  );
};

export default VetVisit;
