import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteAnimal.css";

const AdminConfirmDeleteAnimal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ownerPhoneNumber = location?.state?.ownerPhoneNumber;
  const petName = location?.state?.petID;
  const petID = location?.state?.petName;

  useEffect(() => {
    if (!petID || !petName || !ownerPhoneNumber) {
      navigate("/error");
    }
  }, [petID, petName, ownerPhoneNumber]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `http://localhost:8080/admin/delete-pet?petID=${petID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się usunąć zwierzęcia: ${errorText}`);
      }

      navigate("/admin/success", {
        state: {
          message: "Sukces! Zwierzę zostało usunięte!",
          navigateTo: "/admin/animals",
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
        title={`Czy na pewno chcesz usunąć zwierzę o imieniu ${petName} należące do użytkownika o numerze telefonu ${ownerPhoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteAnimal;
