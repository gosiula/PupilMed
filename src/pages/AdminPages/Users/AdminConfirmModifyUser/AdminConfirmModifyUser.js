import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmModifyUser.css";

const AdminConfirmModifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData;
  const userType = location.state?.userType;
  const clinicData = location?.state?.clinicData;
  const userID = location?.state?.userID;

  useEffect(() => {
    if ((!formData || !userType, !userID)) {
      navigate("/error");
    }
  }, [formData, userType, userID]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        name: formData?.name,
        surname: formData?.surname,
        phoneNumber: formData?.phoneNumber,
        role: userType,
        clinicName: userType === "VET" ? clinicData?.name : null,
        clinicAddress: userType === "VET" ? clinicData?.address : null,
      };

      const response = await fetch(
        `http://localhost:8080/admin/modify-user?userID=${userID}`,
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
        throw new Error(`Nie udało się zmodyfikować użytkownika: ${errorText}`);
      }

      localStorage.removeItem("userForm");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Użytkownik został zmodyfikowany!",
          navigateTo: "/admin/users",
        },
      });
    } catch (error) {
      alert(`Nie udało się zmodyfikować użytkownika: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz modyfikować użytkownika o numerze ${formData?.phoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmModifyUser;
