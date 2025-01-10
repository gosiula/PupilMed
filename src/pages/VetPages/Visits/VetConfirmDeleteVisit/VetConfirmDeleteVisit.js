import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmDeleteVisit.css";

const VetConfirmDeleteVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { formData, visitID } = location?.state;

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `http://localhost:8080/vet/delete-visit?visitID=${visitID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się usunąć wizyty: ${errorText}`);
      }

      navigate("/vet/success", {
        state: {
          message: "Sukces! Wizyta została usunięta!",
          navigateTo: "/vet/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się usunąć wizyty: ${error.message}`);
    }
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz usunąć wizytę w dniu ${formData?.date} o godzinie ${formData?.hour} dla właściciela o numerze ${formData?.ownerPhoneNumber}?`}
      />
    </div>
  );
};

export default VetConfirmDeleteVisit;
