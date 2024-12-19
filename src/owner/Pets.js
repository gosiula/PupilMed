import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { FaDog } from "react-icons/fa6";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import {Link, Router, useNavigate} from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import OwnerHeader from "./OwnerHeader";
import "./Owner.css";
import "../OwnerAndVet.css";

const pets = [
    {
        name: "Bubuś",
        type: "Pies",
        kind: "Owczarek Niemiecki",
        age: "6 lat",
        additional_info: "Uczulony na orzechy."
    },
    {
        name: "Jacuś",
        type: "Kot",
        kind: "Bengalski",
        age: "2 lata",
        additional_info: "Uczulony na czekoladę."
    },
];

function Pets() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>

            <OwnerHeader />

            {pets.map((pets, index) => (
                <Link
                    to="/pets/info" // Ścieżka do komponentu PetInfo
                    key={index}
                    state={{pets}}
                    // onClick={() => navigate('/pets/info', { state: { pets } })}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <div key={index} className="pet-item">
                        <div className="pet-details">
                            <div className="pet-header">
                                <p className="pet-name">Zwierzę </p>
                                <FaDog className="pets-icon" />
                            </div>
                            <p>Imię: {pets.name}</p>
                            <p>Wiek: {pets.age}</p>
                            <p>Gatunek i rasa: {pets.type}, {pets.kind}</p>
                            <p>Dodatkowe informacje:</p>
                            <p>{pets.additional_info}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Pets;
