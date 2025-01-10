import React from "react";
import { useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetAddRecommendation.css";

const VetAddRecommendation = () => {
  const location = useLocation();

  const { visitID, visitDate, visitHour } = location?.state;

  return (
    <div>
      <VetHeader />
      <BackArrow title={`Dodawanie zalecenia - ${visitDate}, ${visitHour}`} />
      <RecommendationInput
        savedRecommendation={null}
        buttonText="Dodaj zalecenie"
        navigateTo={"/vet/visits/recommendation/add/confirm"}
        visitID={visitID}
        visitDate={visitDate}
        visitHour={visitHour}
      />
    </div>
  );
};

export default VetAddRecommendation;
