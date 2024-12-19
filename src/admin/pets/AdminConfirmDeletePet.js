import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import "../../OwnerAndVet.css";
import "../Admin.css";
import "./Pets.css";
import AdminHeader from "../AdminHeader";

function AdminConfirmDeletePet() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pet } = location.state || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader/>

      <div className="header-container">
        <button
          className="back-button"
          onClick={() => {
            navigate("/admin-pets", { state: { pet } });
          }}
        >
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">Potwierdzenie</p>
      </div>

      <div className="confirmation-container">
        <p className="text3">
          Czy na pewno chcesz usunąć zwierze { pet.name }?
        </p>

        <button
          className="confirm-button"
          onClick={() => {
            navigate("/admin-success", {
              state: { message: "Sukces! Zwierze zostało usunięte!" },
            });
          }}
        >
          Potwierdź
        </button>
      </div>
    </div>
  );
}

export default AdminConfirmDeletePet;
