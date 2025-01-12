import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmModifyRecommendation.css";

const VetConfirmModifyRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const visitID = location?.state?.visitID;
  const visitDate = location?.state?.visitDate;
  const visitHour = location?.state?.visitHour;
  const recommendation = location?.state?.recommendation;

  useEffect(() => {
    if (!visitDate || !visitHour || !visitID || !recommendation) {
      navigate("/error");
    }
  }, [visitDate, visitHour, visitID, recommendation]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        visitID: visitID,
        recommendation: recommendation,
      };

      const response = await fetch(
        "http://localhost:8080/vet/modify-recommendation",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się zmodyfikować zalecenia: ${errorText}`);
      }

      localStorage.removeItem("recommendation");

      navigate("/vet/success", {
        state: {
          message: "Sukces! Zalecenie zostało zmodyfikowane!",
          navigateTo: "/vet/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się zmodyfikować zalecenia: ${error.message}`);
    }
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz zmodyfikować zalecenie dla wizyty w dniu ${visitDate} o godzinie ${visitHour}?`}
      />
    </div>
  );
};

export default VetConfirmModifyRecommendation;
