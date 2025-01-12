import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetModifyRecommendation.css";

const VetModifyRecommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const visitID = location?.state?.visitID;
  const visitDate = location?.state?.visitDate;
  const visitHour = location?.state?.visitHour;
  const recommendation_info = location?.state?.recommendation_info;

  useEffect(() => {
    if (!visitDate || !visitHour || !visitID || !recommendation_info) {
      navigate("/error");
    }
  }, [visitDate, visitHour, visitID, recommendation_info]);

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
