import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import RecommendationInput from "../../../../components/RecommendationInput/RecommendationInput";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminAddRecommendation.css";

const AdminAddRecommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const visitID = location?.state?.visitID;
  const visitDate = location?.state?.visitDate;
  const visitHour = location?.state?.visitHour;

  useEffect(() => {
    if (!visitDate || !visitHour || !visitID) {
      navigate("/error");
    }
  }, [visitDate, visitHour, visitID]);

  return (
    <div>
      <AdminHeader />
      <BackArrow title={`Dodawanie zalecenia - ${visitDate}, ${visitHour}`} />
      <RecommendationInput
        savedRecommendation={null}
        buttonText="Dodaj zalecenie"
        navigateTo={"/admin/visits/recommendation/add/confirm"}
        visitID={visitID}
        visitDate={visitDate}
        visitHour={visitHour}
      />
    </div>
  );
};

export default AdminAddRecommendation;
