import React from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmChangePassword.css";

const VetConfirmChangePassword = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/vet/success", {
      state: {
        message: "Sukces! Hasło zostało zmienione!",
        navigateTo: "/vet/account",
      },
    });
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz zmienić hasło?`}
      />
    </div>
  );
};

export default VetConfirmChangePassword;
