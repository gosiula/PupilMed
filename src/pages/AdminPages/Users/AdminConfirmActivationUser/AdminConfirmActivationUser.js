import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmActivationUser.css";

const AdminConfirmActivationUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;
  const userID = location?.state?.userID;
  const isActive = location?.state?.isActive;

  useEffect(() => {
    if (!formData || !userID || isActive === null) {
      navigate("/error");
    }
  }, [formData, userID, isActive]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        isActive: !isActive,
        id: userID,
      };

      const response = await fetch(
        `http://localhost:8080/admin/change-is-active`,
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
        throw new Error(`Nie udało się modyfikować użytkownika: ${errorText}`);
      }

      navigate("/admin/success", {
        state: {
          message: `Sukces! Użytkownik został ${
            isActive ? "deaktywowany" : "aktywowany"
          }!`,
          navigateTo: "/admin/users",
        },
      });
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz ${
          isActive ? "deaktywować" : "aktywować"
        } użytkownika o numerze telefonu ${formData?.phoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmActivationUser;
