import React from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { FaDog } from "react-icons/fa6";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import {Link, Router, useNavigate} from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import OwnerHeader from "../AdminHeader";
import "../Admin.css";
import "./Pets.css";
import AdminHeader from "../AdminHeader";

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

        <AdminHeader />

        {pets.map((pet, index) => (
            <div key={index} className="pet-item">
              <Link
                  to="/admin-pets-info"
                  state={{ pet }}
                  className="pet-link"
              >
                  <div className="pet-details">
                  <div className="pet-header">
                    <p className="name-field">Zwierzę</p>
                    <FaDog className="pets-icon" />
                  </div>
                  <p>Imię: {pet.name}</p>
                  <p>Wiek: {pet.age}</p>
                  <p>Gatunek i rasa: {pet.type}, {pet.kind}</p>
                  <p>Dodatkowe informacje:</p>
                  <p>{pet.additional_info}</p>

                  <div className="pet-buttons">
                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/admin-modify-pet', { state: { pet } });
                        }}
                        className="modify-btn"
                    >
                      Modyfikuj zwierzę
                    </button>
                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/admin-delete-pet', { state: { pet } });
                        }}
                        className="delete-btn"
                    >
                      Usuń zwierzę
                    </button>
                  </div>
                </div>
              </Link>
            </div>
        ))}

        <Link
            to="/admin-add-pet"
            className="add-pet-btn"
        >
          Dodaj zwierzę
        </Link>
      </div>

  );
}

export default Pets;
