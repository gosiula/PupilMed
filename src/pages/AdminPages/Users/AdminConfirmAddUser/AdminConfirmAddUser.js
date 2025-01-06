import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmAddUser.css";

const AdminConfirmAddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData || {};

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Użytkownik został dodany!",
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
        title={`Czy na pewno chcesz dodać nowego użytkownika o numerze ${formData.numer_telefonu}?`}
      />
    </div>
  );
};

export default AdminConfirmAddUser;
