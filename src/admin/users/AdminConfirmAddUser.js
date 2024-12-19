import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
// import "../../OwnerAndVet.css";
import "../Admin.css";
import AdminHeader from "../AdminHeader";

function AdminConfirmAddUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader/>

      <div className="header-container">
        <button
          className="back-button"
          onClick={() => navigate("/admin-add-user")}
        >
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">Potwierdzenie</p>
      </div>

      <div className="confirmation-container">
        <p className="text3">
            Czy na pewno chcesz dodać nowego użytkownika {formData.imie} {formData.nazwisko} o numerze telefonu
            {formData.numer_telefonu}?
        </p>

        <button
          className="confirm-button"
          onClick={() => {
            navigate("/admin-success", {
              state: { message: "Sukces! Użytkownik został dodany!" },
            });
          }}
        >
          Potwierdź
        </button>
      </div>
    </div>
  );
}

export default AdminConfirmAddUser;
