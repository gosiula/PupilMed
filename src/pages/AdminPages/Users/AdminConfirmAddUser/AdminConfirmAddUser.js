import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmAddUser.css";

const AdminConfirmAddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData;
  const userType = location.state?.userType;
  const clinicData = location?.state?.clinicData;
  const password = location?.state?.password;

  useEffect(() => {
    if (!formData || !userType || !password) {
      navigate("/error");
    }
  }, [formData, userType, password]);

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
        password: password,
        role: userType,
        clinicName: userType === "VET" ? clinicData?.name : null,
        clinicAddress: userType === "VET" ? clinicData?.address : null,
      };

      const response = await fetch("http://localhost:8080/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się dodać użytkownika: ${errorText}`);
      }

      localStorage.removeItem("userForm");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Użytkownik został dodany!",
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
        title={`Czy na pewno chcesz dodać nowego użytkownika o numerze ${formData?.phoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmAddUser;
