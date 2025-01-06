import React from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import OwnerHeader from "../../../../components/OwnerHeader/OwnerHeader";
import "./OwnerConfirmChangePassword.css";

const OwnerConfirmChangePassword = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/vet/success", {
      state: {
        message: "Sukces! Hasło zostało zmienione!",
        navigateTo: "/owner/account",
      },
    });
  };

  return (
    <div>
      <OwnerHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz zmienić hasło?`}
      />
    </div>
  );
};

export default OwnerConfirmChangePassword;
