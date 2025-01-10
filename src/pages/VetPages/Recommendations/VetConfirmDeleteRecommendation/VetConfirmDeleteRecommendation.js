import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmDeleteRecommendation.css";

const VetConfirmDeleteRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { visitID, visitDate, visitHour } = location?.state;

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `http://localhost:8080/vet/delete-recommendation?visitID=${visitID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się usunąć zalecenia: ${errorText}`);
      }

      navigate("/vet/success", {
        state: {
          message: "Sukces! Zalecenie zostało usunięte!",
          navigateTo: "/vet/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się usunąć zalecenia: ${error.message}`);
    }
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz usunąć zalecenie dla wizyty w dniu ${visitDate} o godzinie ${visitHour}?`}
      />
    </div>
  );
};

export default VetConfirmDeleteRecommendation;
