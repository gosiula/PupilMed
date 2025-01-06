import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetAddRecommendation.css";

const VetAddRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { visitDateAndHour } = useParams();

  const [visitDate, visitHour] = visitDateAndHour
    ? visitDateAndHour.split("_")
    : ["", ""];

  const { visitDate: stateVisitDate, visitHour: stateVisitHour } =
    location.state || {};

  const finalVisitDate = stateVisitDate || visitDate || "";
  const finalVisitHour =
    stateVisitHour.replace(":", "-") || "" || visitHour.replace(":", "-") || "";

  const handleRecommendationSubmit = () => {
    console.log(visitDate);
    navigate(
      `/vet/visits/recommendation/add/confirm/${finalVisitDate}_${finalVisitHour}`,
      {
        state: { stateVisitDate, stateVisitHour },
      }
    );
  };

  return (
    <div>
      <VetHeader />
      <BackArrow
        title={`Dodawanie zalecenia - ${stateVisitDate}, ${stateVisitHour}`}
      />
      <RecommendationInput
        savedRecommendation={null}
        buttonText="Dodaj zalecenie"
        onSubmit={handleRecommendationSubmit}
        date={finalVisitDate}
        hour={finalVisitHour}
      />
    </div>
  );
};

export default VetAddRecommendation;
