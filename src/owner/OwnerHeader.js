import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { IoPaw } from "react-icons/io5";
import "./Owner.css";
import {FaDog} from "react-icons/fa6";
const OwnerHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="owner-header">
            <button
                className={location.pathname === "/owner" ? "current-button" : "owner-button"}
                onClick={() => navigate("/owner")}
            >
                <LuCalendarCheck className="owner-icon" />
                Wizyty
            </button>
            <button
                className={location.pathname === "/pets" ? "current-button" : "owner-button"}
                onClick={() => navigate("/pets")}
            >
                <FaDog className="owner-icon" />
                Zwierzęta
            </button>
            <button
                className={location.pathname === "/owneraccount" ? "current-button" : "owner-button"}
                onClick={() => navigate("/owneraccount")}
            >
                <MdAccountCircle className="owner-icon" />
                Konto
            </button>
            <button
                className={location.pathname === "/ownerlogout" ? "current-button" : "owner-button"}
                onClick={() => navigate("/ownerlogout")}
            >
                <MdLogout className="owner-icon" />
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

// <button
// className="owner-button"}
//   onClick={() => navigate("/ownerrecommendations")}
// >
//   <GiMedicines className="owner-icon" />
//  Zalecenia
// </button>