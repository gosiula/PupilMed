import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteVisit.css";

const AdminConfirmDeleteVisit = () => {
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

      const response = await fetch(
        `http://localhost:8080/admin/delete-visit?visitID=${visitID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response)

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się usunąć wizyty: ${errorText}`);
      }

      navigate("/admin/success", {
        state: {
          message: "Sukces! Wizyta została usunięta!",
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
        title={`Czy na pewno chcesz usunąć wizytę w dniu ${formData?.date} o godzinie ${formData?.hour} dla właściciela o numerze ${formData?.ownerPhoneNumber} oraz weterynarza o numerze ${formData?.vetPhoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteVisit;
