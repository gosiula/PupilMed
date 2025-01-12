import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { formatDateForBackend } from "../../../../utils/formatDateForBackend";
import "./VetConfirmAddVisit.css";

const VetConfirmAddVisit = () => {
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
        date: formatDateForBackend(formData.date),
        hour: formData.hour,
        visitType: formData.visitType,
        price: formData.price,
      };

      const response = await fetch("http://localhost:8080/vet/add-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się dodać wizyty: ${errorText}`);
      }

      localStorage.removeItem("date");
      localStorage.removeItem("hour");
      localStorage.removeItem("ownerPhoneNumber");
      localStorage.removeItem("petName");
      localStorage.removeItem("visitType");
      localStorage.removeItem("price");

      navigate("/vet/success", {
        state: {
          message: "Sukces! Wizyta została dodana!",
          navigateTo: "/vet/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się dodać wizyty: ${error.message}`);
    }
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nową wizytę w dniu ${formData?.date} o godzinie ${formData?.hour} dla właściciela o numerze ${formData?.ownerPhoneNumber}?`}
      />
    </div>
  );
};

export default VetConfirmAddVisit;
