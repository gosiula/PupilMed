import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "../../OwnerAndVet.css";
import "../Admin.css";
import AdminHeader from "../AdminHeader";

function AdminSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = location.state || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader/>

      <div className="confirmation-container">
        <p className="text3">{message}</p>
        <button
          className="confirm-button"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Powrót do strony głównej
        </button>
      </div>

      <div className="paw-prints-container">
        <IoPaw className="paw-print paw-print-1" />
        <IoPaw className="paw-print paw-print-3" />
        <IoPaw className="paw-print paw-print-2" />
        <IoPaw className="paw-print paw-print-4" />
      </div>
    </div>
  );
}

export default AdminSuccess;
