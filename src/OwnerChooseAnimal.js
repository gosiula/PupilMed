import React from "react";
import { useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { IoPaw } from "react-icons/io5";
import "./Owner.css";

function OwnerChooseAnimal() {
  const navigate = useNavigate();

  const handleChooseAnimal = (animal) => {
    // tutaj trzeba dodać logikę przekazywania, które zwierzę wybraliśmy
    navigate("/owner");
  };

  const user = JSON.parse(localStorage.getItem("isLoggedIn"));

  return (
    <div className="choose-animal-container">
      <p className="header">Wybierz pupila, którego konto chcesz zobaczyć.</p>
      <div className="button-container">
        {user?.zwierzeta.map((zwierze, index) => (
          <button
            key={index}
            className="animal-button"
            onClick={() => handleChooseAnimal(zwierze)}
          >
            {zwierze}
          </button>
        ))}
      </div>
      <div className="logo-container-choose-animal">
        <p className="logo-text">PupilMed</p>
        <div className="heart-with-paw">
          <GoHeartFill className="heart-icon" />
          <IoPaw className="paw-icon" />
        </div>
      </div>
    </div>
  );
}

export default OwnerChooseAnimal;
