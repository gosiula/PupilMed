import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmModifyVisit.css";

const AdminConfirmModifyVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData || {};

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Wizyta została zmodyfikowana!",
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
        title={`Czy na pewno chcesz zmodyfikować wizytę w dniu ${formData.data} o godzinie ${formData.godzina} dla właściciela o numerze ${formData.numer_telefonu_wlasciciela} oraz weterynarza o numerze ${formData.numer_telefonu_weterynarza}?`}
      />
    </div>
  );
};

export default AdminConfirmModifyVisit;
