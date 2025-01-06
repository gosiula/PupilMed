import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmModifyRecommendation.css";

const AdminConfirmModifyRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { stateVisitDate, stateVisitHour } = location.state || {};

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Zalecenie zostało zmodyfikowane!",
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
        title={`Czy na pewno chcesz zmodyfikować zalecenie dla wizyty w dniu ${stateVisitDate} o godzinie ${stateVisitHour}?`}
      />
    </div>
  );
};

export default AdminConfirmModifyRecommendation;
