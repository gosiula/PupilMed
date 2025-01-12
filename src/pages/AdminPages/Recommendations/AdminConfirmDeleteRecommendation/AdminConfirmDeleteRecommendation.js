import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteRecommendation.css";

const AdminConfirmDeleteRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const visitID = location?.state?.visitID;
  const visitDate = location?.state?.visitDate;
  const visitHour = location?.state?.visitHour;

  useEffect(() => {
    if (!visitHour || !visitDate || !visitID) {
      navigate("/error");
    }
  }, [visitDate, visitHour, visitID]);

  const handleConfirm = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `http://localhost:8080/admin/delete-recommendation?visitID=${visitID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nie udało się usunąć zalecenia: ${errorText}`);
      }

      navigate("/admin/success", {
        state: {
          message: "Sukces! Zalecenie zostało usunięte!",
          navigateTo: "/admin/visits",
        },
      });
    } catch (error) {
      alert(`Nie udało się usunąć zalecenia: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz usunąć zalecenie dla wizyty w dniu ${visitDate} o godzinie ${visitHour}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteRecommendation;
