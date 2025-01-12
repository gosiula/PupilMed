import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminModifyRecommendation.css";

const AdminModifyRecommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const visitID = location?.state?.visitID;
  const visitDate = location?.state?.visitDate;
  const visitHour = location?.state?.visitHour;
  const recommendation_info = location?.state?.recommendation_info;

  useEffect(() => {
    if (!visitDate || !visitHour || !recommendation_info || !visitID) {
      navigate("/error");
    }
  }, [visitDate, visitHour, recommendation_info, visitID]);

  return (
    <div>
      <AdminHeader />
      <BackArrow title={`Modyfikacja zalecenia - ${visitDate}, ${visitHour}`} />
      <RecommendationInput
        savedRecommendation={recommendation_info}
        buttonText="Modyfikuj zalecenie"
        navigateTo={"/admin/visits/recommendation/modify/confirm"}
        visitID={visitID}
        visitDate={visitDate}
        visitHour={visitHour}
      />
    </div>
  );
};

export default AdminModifyRecommendation;
