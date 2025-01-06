import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { recommendation_info } from "../../../../data/recommendation_info";
import "./AdminModifyRecommendation.css";

const AdminModifyRecommendation = () => {
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
      `/admin/visits/recommendation/modify/confirm/${finalVisitDate}_${finalVisitHour}`,
      {
        state: { stateVisitDate, stateVisitHour },
      }
    );
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow
        title={`Modyfikacja zalecenia - ${stateVisitDate}, ${stateVisitHour}`}
      />
      <RecommendationInput
        savedRecommendation={recommendation_info.zalecenie}
        buttonText="Modyfikuj zalecenie"
        onSubmit={handleRecommendationSubmit}
        date={finalVisitDate}
        hour={finalVisitHour}
      />
    </div>
  );
};

export default AdminModifyRecommendation;
