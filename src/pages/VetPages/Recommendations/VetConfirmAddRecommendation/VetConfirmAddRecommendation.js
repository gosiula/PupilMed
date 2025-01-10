import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmAddRecommendation.css";

const VetConfirmAddRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { visitDate, visitHour, visitID, recommendation } = location?.state;

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
        "http://localhost:8080/vet/add-recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się dodać zalecenia: ${errorText}`);
      }

      localStorage.removeItem("recommendation");

      navigate("/vet/success", {
        state: {
          message: "Sukces! Zalecenie zostało dodane!",
          navigateTo: "/vet/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się dodać zalecenia: ${error.message}`);
    }
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nowe zalecenie dla wizyty w dniu ${visitDate} o godzinie ${visitHour}?`}
      />
    </div>
  );
};

export default VetConfirmAddRecommendation;
