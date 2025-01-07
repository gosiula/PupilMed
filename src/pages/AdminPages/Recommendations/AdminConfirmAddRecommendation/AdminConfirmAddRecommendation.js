import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmAddRecommendation.css";

const AdminConfirmAddRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { stateVisitDate, stateVisitHour } = location.state || {};

  const handleConfirm = () => {
    // localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Zalecenie zostało dodane!",
        navigateTo: "/admin/visits",
      },
    });
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nowe zalecenie dla wizyty w dniu ${stateVisitDate} o godzinie ${stateVisitHour}?`}
      />
    </div>
  );
};

export default AdminConfirmAddRecommendation;
