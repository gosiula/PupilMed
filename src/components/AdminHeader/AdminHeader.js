import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { LuCalendarCheck } from "react-icons/lu";
import { FaDog } from "react-icons/fa6";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/visits",
      label: "Wizyty",
      icon: <LuCalendarCheck className="admin-icon" />,
    },
    {
      path: "/admin/animals",
      label: "Zwierzęta",
      icon: <FaDog className="admin-icon" />,
    },
    {
      path: "/admin/users",
      label: "Użytkownicy",
      icon: <MdAccountCircle className="admin-icon" />,
    },
    {
      path: "/admin/logout",
      label: "Wyloguj",
      icon: <MdLogout className="admin-icon" />,
    },
  ];

  return (
    <div className="admin-header">
      {menuItems.map((item) => (
        <button
          key={item.path}
          className={`admin-button ${
            location.pathname.startsWith(item.path) ? "current-button" : ""
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
      <div className="logo-container">
        <p className="logo-text">PupilMed</p>
        <div className="heart-with-paw">
          <GoHeartFill className="heart-icon" />
          <IoPaw className="paw-icon" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
