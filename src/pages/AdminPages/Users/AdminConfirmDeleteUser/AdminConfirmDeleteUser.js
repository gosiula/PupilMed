import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteUser.css";

const AdminConfirmDeleteUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.user || {};

  const handleConfirm = () => {
    // localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Użytkownik został usunięty!",
        navigateTo: "/admin/users",
      },
    });
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz usunąć użytkownika o numerze telefonu ${formData.numer_telefonu}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteUser;
