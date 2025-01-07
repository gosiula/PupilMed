import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmAddRecommendation.css";

const VetConfirmAddRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { stateVisitDate, stateVisitHour } = location.state || {};

  const handleConfirm = () => {
    // localStorage.clear();
    navigate("/vet/success", {
      state: {
        message: "Sukces! Zalecenie zostało dodane!",
        navigateTo: "/vet/visits",
      },
    });
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nowe zalecenie dla wizyty w dniu ${stateVisitDate} o godzinie ${stateVisitHour}?`}
      />
    </div>
  );
};

export default VetConfirmAddRecommendation;
