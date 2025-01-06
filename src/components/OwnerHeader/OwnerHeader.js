import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { LuCalendarCheck } from "react-icons/lu";
import { FaDog } from "react-icons/fa6";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./OwnerHeader.css";

const OwnerHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: "/owner/visits",
      label: "Wizyty",
      icon: <LuCalendarCheck className="admin-icon" />,
    },
    {
      path: "/owner/animals",
      label: "Zwierzęta",
      icon: <FaDog className="admin-icon" />,
    },
    {
      path: "/owner/account",
      label: "Konto",
      icon: <MdAccountCircle className="admin-icon" />,
    },
    {
      path: "/owner/logout",
      label: "Wyloguj",
      icon: <MdLogout className="admin-icon" />,
    },
  ];

  return (
    <div className="owner-header">
      {menuItems.map((item) => (
        <button
          key={item.path}
          className={`owner-button ${
            location.pathname.startsWith(item.path)
              ? "owner-current-button"
              : ""
          }`}
          onClick={() => {
            navigate(item.path);
            localStorage.clear();
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
      <div className="owner-logo-container">
        <p className="owner-logo-text">PupilMed</p>
        <div className="owner-heart-with-paw">
          <GoHeartFill className="owner-heart-icon" />
          <IoPaw className="owner-paw-icon" />
        </div>
      </div>
    </div>
  );
};

export default OwnerHeader;
