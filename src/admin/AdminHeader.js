import React from "react";
import { useNavigate } from "react-router-dom";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { IoPaw } from "react-icons/io5";
import "./Admin.css";
import {FaDog} from "react-icons/fa6";
import {GiMedicines} from "react-icons/gi";
const OwnerHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="owner-header">
            <button
                className={location.pathname === "/admin" ? "current-button" : "owner-button"}
                onClick={() => navigate("/admin")}>
                <LuCalendarCheck className="admin-icon" />
                Wizyty
            </button>
            <button
                className={location.pathname === "/admin-pets" ? "current-button" : "owner-button"}
                onClick={() => navigate("/admin-pets")}
            >
                <FaDog className="owner-icon" />
                Zwierzęta
            </button>
            {/*<button*/}
            {/*    className={location.pathname === "/admin-recommendations" ? "current-button" : "owner-button"}*/}
            {/*    onClick={() => navigate("/admin-recommendations")}>*/}
            {/*    <GiMedicines className="admin-icon" />*/}
            {/*    Zalecenia*/}
            {/*</button>*/}
            <button
                className={location.pathname === "/admin-account" ? "current-button" : "owner-button"}
                onClick={() => navigate("/admin-users")}
            >
                <MdAccountCircle className="admin-icon" />
                Użytkownicy
            </button>
            <button
                className={location.pathname === "/admin-logout" ? "current-button" : "owner-button"}
                onClick={() => navigate("/admin-logout")}
            >
                <MdLogout className="admin-icon" />
                Wyloguj
            </button>
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

export default OwnerHeader;