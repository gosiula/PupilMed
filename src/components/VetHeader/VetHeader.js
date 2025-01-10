import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { LuCalendarCheck } from "react-icons/lu";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./VetHeader.css";

const VetHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: "/vet/visits",
      label: "Wizyty",
      icon: <LuCalendarCheck className="vet-icon" />,
    },
    {
      path: "/vet/account",
      label: "Konto",
      icon: <MdAccountCircle className="vet-icon" />,
    },
    {
      path: "/vet/logout",
      label: "Wyloguj",
      icon: <MdLogout className="vet-icon" />,
    },
  ];

  return (
    <div className="vet-header">
      {menuItems.map((item) => (
        <button
          key={item.path}
          className={`vet-button ${
            location.pathname.startsWith(item.path) ? "vet-current-button" : ""
          }`}
          onClick={() => {
            localStorage.removeItem("date");
            localStorage.removeItem("hour");
            localStorage.removeItem("ownerPhoneNumber");
            localStorage.removeItem("petName");
            localStorage.removeItem("visitType");
            localStorage.removeItem("price");
            localStorage.removeItem("recommendation");
            navigate(item.path);
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
      <div className="vet-logo-container">
        <p className="vet-logo-text">PupilMed</p>
        <div className="vet-heart-with-paw">
          <GoHeartFill className="vet-heart-icon" />
          <IoPaw className="vet-paw-icon" />
        </div>
      </div>
    </div>
  );
};

export default VetHeader;
