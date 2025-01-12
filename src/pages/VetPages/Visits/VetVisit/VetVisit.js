import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitButton from "../../../../components/VisitButton/VisitButton";
import Recommendation from "../../../../components/Recommendation/Recommendation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatDate } from "../../../../utils/formatDate";
import { formatTime } from "../../../../utils/formatTime";
import { formatAge } from "../../../../utils/formatAge";
import "./VetVisit.css";
import "../../../../App.css";

const VetVisit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [visit, setVisit] = useState({});
  const [loading, setLoading] = useState(true);

  const visitID = location?.state?.visitID;

  useEffect(() => {
    if (!visitID) {
      navigate("/error");
    }
  }, [visitID]);

  useEffect(() => {
    fetchVisit();
  }, [visitID]);

  const fetchVisit = async () => {
    try {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const resp = await fetch(
        `http://localhost:8080/vet/visit-details?visitID=${visitID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!resp.ok) {
        const errorDetails = await resp.text();
        throw new Error(
          `Nie udało się pobrać wizyt: ${resp.status} - ${errorDetails}`
        );
      }

      const json = await resp.json();

      if (json && json.date) {
        json.date = formatDate(json.date);
      }

      if (json && json.hour) {
        json.hour = formatTime(json.hour);
      }

      setVisit(json);
    } catch (error) {
      console.error("Nie udało się pobrać wizyt:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          <BackArrow title={`Wizyta ${visit?.date}`} />

          <div className="info-container">
            <div className="visit-info">
              <p className="visit-date-info2">Informacje o wizycie:</p>
              <p>
                <strong>Godzina:</strong> {visit?.hour}
              </p>
              <p>
                <strong>Typ wizyty:</strong> {visit?.visitType}
              </p>
              <p>
                <strong>Właściciel:</strong> {visit?.ownerName}{" "}
                {visit?.ownerSurname}
              </p>
              <p>
                <strong>Numer właściciela:</strong> {visit?.ownerPhoneNumber}
              </p>
              <p>
                <strong>Cena:</strong>{" "}
                {visit?.price ? `${visit.price} zł` : "Brak danych"}
              </p>
              <p>
                <strong>Zwierzę:</strong> {visit?.petKind}{" "}
                {visit?.petName || ""}
              </p>
              <p>
                <strong>Rasa:</strong> {visit?.petType}
              </p>
              <p>
                <strong>Wiek:</strong> {formatAge(visit?.petAge)}
              </p>

              <VisitButton
                visitID={visitID}
                formData={visit}
                modifyPath={`/vet/visits/visit/modify`}
                deletePath={`/vet/visits/visit/delete`}
              />
            </div>
            <Recommendation
              recommendation_info={
                visit.recommendation
                  ? visit.recommendation.recommendation
                  : null
              }
              visitDate={visit.date}
              visitHour={visit.hour}
              formData={visit}
              visitID={visitID}
              addPath={`/vet/visits/recommendation/add`}
              modifyPath={`/vet/visits/recommendation/modify`}
              deletePath={`/vet/visits/recommendation/delete`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VetVisit;
