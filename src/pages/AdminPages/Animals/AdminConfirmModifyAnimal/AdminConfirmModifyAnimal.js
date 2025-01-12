import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { formatDateForBackend } from "../../../../utils/formatDateForBackend";
import "./AdminConfirmModifyAnimal.css";
import "../../../../App.css";

const AdminConfirmModifyAnimal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;
  const petID = location?.state?.petID;

  useEffect(() => {
    if (!petID || !formData) {
      navigate("/error");
    }
  }, [petID, formData]);

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

      const response = await fetch(
        `http://localhost:8080/admin/modify-pet?petID=${petID}`,
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
        throw new Error(`Nie udało się zmodyfikować zwierzęcia: ${errorText}`);
      }

      localStorage.removeItem("animalForm");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Zwierzę zostało zmodyfikowane!",
          navigateTo: "/admin/animals",
        },
      });
    } catch (error) {
      alert(`Nie udało się zmodyfikować zwierzęcia: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz zmodyfikować zwierzę o imieniu ${formData?.petName} użytkownika o numerze ${formData?.ownerPhoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmModifyAnimal;
