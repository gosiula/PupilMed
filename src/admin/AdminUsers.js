import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "./Admin.css";
// import "../OwnerAndVet.css";
import OwnerHeader from "./AdminHeader";


// przykładowe zalecenia
const users = [
    {
        name: "Maria",
        surname: "Polka",
        phone_number: "222222222"
    },
    {
        name: "Marian",
        surname: "Polak",
        phone_number: "222222223"
    },
];

function AdminUsers() {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
            <OwnerHeader />

            <p className="text1">Zalecenia</p>
            {recommendations.map((recommendation, index) => (
                <div key={index} className="recommendation-item">
                    <div className="recommendation-details">
                        <div className="visit-header">
                            <p className="visit-date">Zalecenie {recommendation.data}</p>
                            <GiMedicines className="recommendation-icon" />
                        </div>
                        <p>Informacje od lekarza:</p>
                        <p>{recommendation.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OwnerRecommendations;
