import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmAddRecommendation.css";

const AdminConfirmAddRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const visitID = location?.state?.visitID;
  const visitDate = location?.state?.visitDate;
  const visitHour = location?.state?.visitHour;
  const recommendation = location?.state?.recommendation;

  useEffect(() => {
    if (!visitDate || !visitHour || !recommendation || !visitID) {
      navigate("/error");
    }
  }, [visitDate, visitHour, recommendation, visitID]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        visitID: visitID,
        recommendation: recommendation,
      };

      const response = await fetch(
        "http://localhost:8080/admin/add-recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się dodać zalecenia: ${errorText}`);
      }

      localStorage.removeItem("recommendation");

      navigate("/admin/success", {
        state: {
          message: "Sukces! Zalecenie zostało dodane!",
          navigateTo: "/admin/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się dodać zalecenia: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nowe zalecenie dla wizyty w dniu ${visitDate} o godzinie ${visitHour}?`}
      />
    </div>
  );
};

export default AdminConfirmAddRecommendation;
