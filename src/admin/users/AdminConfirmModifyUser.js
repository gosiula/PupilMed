import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import "../../OwnerAndVet.css";
import "../Admin.css";
import AdminHeader from "../AdminHeader";

function AdminConfirmModifyVisit() {
  const navigate = useNavigate();
  const location = useLocation();

  const { visitDate, visitHour } = location.state || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader/>

      <div className="header-container">
        <button
          className="back-button"
          onClick={() => {
            navigate("/admin-modify-visit", { state: { visitDate, visitHour } });
          }}
        >
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">Potwierdzenie</p>
      </div>

      <div className="confirmation-container">
        <p className="text3">
          Czy na pewno chcesz modyfikować wizytę w dniu {visitDate} o godzinie{" "}
          {visitHour}?
        </p>

        <button
          className="confirm-button"
          onClick={() => {
            navigate("/admin-success", {
              state: { message: "Sukces! Wizyta została zmodyfikowana!" },
            });
          }}
        >
          Potwierdź
        </button>
      </div>
    </div>
  );
}

export default AdminConfirmModifyVisit;
