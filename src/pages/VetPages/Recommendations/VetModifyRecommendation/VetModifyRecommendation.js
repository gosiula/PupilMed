import React from "react";
import { useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetModifyRecommendation.css";

const VetModifyRecommendation = () => {
  const location = useLocation();

  const { visitID, visitHour, visitDate, recommendation_info } =
    location?.state;

  return (
    <div>
      <VetHeader />
      <BackArrow title={`Modyfikacja zalecenia - ${visitDate}, ${visitHour}`} />
      <RecommendationInput
        savedRecommendation={recommendation_info}
        buttonText="Modyfikuj zalecenie"
        navigateTo={"/vet/visits/recommendation/modify/confirm"}
        visitID={visitID}
        visitDate={visitDate}
        visitHour={visitHour}
      />
    </div>
  );
};

export default VetModifyRecommendation;
