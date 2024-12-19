import React, {useEffect} from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import {useLocation, useNavigate} from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import "../Admin.css";
import "../../OwnerAndVet.css";
import OwnerHeader from "../AdminHeader";
import AdminHeader from "../AdminHeader";


// przykładowe zalecenia
const recommendations = [
    {
        data: "2024-12-01",
        content: "Podawać leki przez 3 tygodnie. Umówić konsultację.",
    },
    {
        data: "2024-12-05",
        content: "Używać kropli przez miesiąc. Podawać je rano i wieczorem.",
    },
    { data: "2024-12-10", content: "Umówić kolejną wizytę za pół roku." },
];

function PetsInfo() {
    const navigate = useNavigate();
    const location = useLocation();

    const { pet } = location.state || {};

    useEffect(() => {
        if (!pet) {
            navigate('/error');
        }
    }, [pet, navigate]);

    if (!pet) return null;

    return (
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
            <AdminHeader />

            <p className="text1">Zalecenia dla zwierzaka "{pet.name}"</p>
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

export default PetsInfo;
