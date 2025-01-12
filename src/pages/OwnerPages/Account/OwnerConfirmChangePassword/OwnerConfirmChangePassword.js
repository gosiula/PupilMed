import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import OwnerHeader from "../../../../components/OwnerHeader/OwnerHeader";
import "./OwnerConfirmChangePassword.css";

const OwnerConfirmChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPassword = location?.state?.currentPassword;
  const newPassword = location?.state?.newPassword;

  useEffect(() => {
    if (!currentPassword || !newPassword) {
      navigate("/error");
    }
  }, [currentPassword, newPassword]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      const response = await fetch(
        `http://localhost:8080/owner/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się zmodyfikować hasła: ${errorText}`);
      }

      navigate("/admin/success", {
        state: {
          message: "Sukces! Hasło zostało zmienione!",
          navigateTo: "/owner/account",
        },
      });
    } catch (error) {
      alert(`Nie udało się zmodyfikować hasła: ${error.message}`);
    }
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
