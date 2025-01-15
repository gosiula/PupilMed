import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { formatDateForBackend } from "../../../../utils/formatDateForBackend";
import "./VetConfirmModifyVisit.css";

const VetConfirmModifyVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;
  const visitID = location?.state?.visitID;

  useEffect(() => {
    if (!visitID || !formData) {
      navigate("/error");
    }
  }, [visitID, formData]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      console.log(visitID);

      const payload = {
        id: visitID,
        ownerPhoneNumber: formData.ownerPhoneNumber,
        petName: formData.petName,
        date: formatDateForBackend(formData.date),
        hour: formData.hour,
        visitType: formData.visitType,
        price: formData.price,
      };

      const response = await fetch("http://localhost:8080/vet/modify-visit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się zmodyfikować wizyty: ${errorText}`);
      }

      localStorage.removeItem("date");
      localStorage.removeItem("hour");
      localStorage.removeItem("ownerPhoneNumber");
      localStorage.removeItem("petName");
      localStorage.removeItem("visitType");
      localStorage.removeItem("price");

      navigate("/vet/success", {
        state: {
          message: "Sukces! Wizyta została zmodyfikowana!",
          navigateTo: "/vet/visits",
        },
      });
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz zmodyfikować wizytę w dniu ${formData?.date} o godzinie ${formData?.hour} dla właściciela o numerze ${formData?.ownerPhoneNumber}?`}
      />
    </div>
  );
};

export default VetConfirmModifyVisit;
