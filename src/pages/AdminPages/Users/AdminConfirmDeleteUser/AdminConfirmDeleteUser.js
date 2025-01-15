import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteUser.css";

const AdminConfirmDeleteUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;
  const userID = location?.state?.userID;

  useEffect(() => {
    if (!formData || !userID) {
      navigate("/error");
    }
  }, [formData, userID]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `http://localhost:8080/admin/delete-user?userID=${userID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się usunąć użytkownika: ${errorText}`);
      }

      navigate("/admin/success", {
        state: {
          message: "Sukces! Użytkownik został usunięty!",
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
        title={`Czy na pewno chcesz usunąć użytkownika o numerze telefonu ${formData?.phoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteUser;
