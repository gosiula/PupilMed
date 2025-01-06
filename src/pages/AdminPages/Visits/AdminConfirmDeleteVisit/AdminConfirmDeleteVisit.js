import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteVisit.css";

const AdminConfirmDeleteVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData || {};

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Wizyta została usunięta!",
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
        title={`Czy na pewno chcesz usunąć wizytę w dniu ${formData.data} o godzinie ${formData.godzina} dla właściciela o numerze ${formData.numer_telefonu_wlasciciela} oraz weterynarza o numerze ${formData.numer_telefonu_weterynarza}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteVisit;
