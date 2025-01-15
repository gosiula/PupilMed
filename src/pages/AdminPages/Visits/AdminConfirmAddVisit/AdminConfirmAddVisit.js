import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { formatDateForBackend } from "../../../../utils/formatDateForBackend";
import "./AdminConfirmAddVisit.css";

const AdminConfirmAddVisit = () => {
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
        vetPhoneNumber: formData.vetPhoneNumber,
        ownerPhoneNumber: formData.ownerPhoneNumber,
        petName: formData.petName,
        date: formatDateForBackend(formData.date),
        hour: formData.hour,
        visitType: formData.visitType,
        price: formData.price,
      };

      const response = await fetch("http://localhost:8080/admin/add-visit", {
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
      localStorage.removeItem("vetPhoneNumber");
      localStorage.removeItem("petName");
      localStorage.removeItem("visitType");
      localStorage.removeItem("price");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Wizyta została dodana!",
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
        title={`Czy na pewno chcesz dodać nową wizytę w dniu ${formData?.date} o godzinie ${formData?.hour} dla właściciela o numerze ${formData?.ownerPhoneNumber} oraz weterynarza o numerze ${formData?.vetPhoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmAddVisit;
