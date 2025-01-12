import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { formatDateForBackend } from "../../../../utils/formatDateForBackend";
import "./AdminConfirmAddAnimal.css";
import "../../../../App.css";

const AdminConfirmAddAnimal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;

  useEffect(() => {
    if (!formData) {
      navigate("/error");
    }
  }, [formData]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        ownerPhoneNumber: formData.ownerPhoneNumber,
        petName: formData.petName,
        petDob: formatDateForBackend(formData.petDob),
        petSpecies: formData.petSpecies,
        petBreed: formData.petBreed,
        additionalInfo: formData.additionalInfo,
      };

      const response = await fetch("http://localhost:8080/admin/add-pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się dodać zwierzęcia: ${errorText}`);
      }

      localStorage.removeItem("animalForm");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Zwierzę zostało dodane!",
          navigateTo: "/admin/animals",
        },
      });
    } catch (error) {
      alert(`Nie udało się dodać zwierzęcia: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nowe zwierzę ${formData?.petName} dla użytkownika o numerze ${formData?.ownerPhoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmAddAnimal;
