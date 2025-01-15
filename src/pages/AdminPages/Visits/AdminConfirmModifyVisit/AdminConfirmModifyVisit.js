import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { formatDateForBackend } from "../../../../utils/formatDateForBackend";
import "./AdminConfirmModifyVisit.css";
import "../../../../App.css";

const AdminConfirmModifyVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;
  const visitID = location?.state?.visitID;

  useEffect(() => {
    if (!formData || !visitID) {
      navigate("/error");
    }
  }, [formData, visitID]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        id: visitID,
        ownerPhoneNumber: formData.ownerPhoneNumber,
        vetPhoneNumber: formData.vetPhoneNumber,
        petName: formData.petName,
        date: formatDateForBackend(formData.date),
        hour: formData.hour,
        visitType: formData.visitType,
        price: formData.price,
      };

      const response = await fetch("http://localhost:8080/admin/modify-visit", {
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
      localStorage.removeItem("vetPhoneNumber");
      localStorage.removeItem("petName");
      localStorage.removeItem("visitType");
      localStorage.removeItem("price");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Wizyta została zmodyfikowana!",
          navigateTo: "/admin/visits",
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
        title={`Czy na pewno chcesz zmodyfikować wizytę w dniu ${formData?.date} o godzinie ${formData?.hour} dla właściciela o numerze ${formData?.ownerPhoneNumber} oraz weterynarza o numerze ${formData?.vetPhoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmModifyVisit;
