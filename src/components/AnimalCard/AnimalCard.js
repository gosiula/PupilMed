import React from "react";
import { FaDog, FaCat, FaPaw } from "react-icons/fa6";
import { GiTurtle } from "react-icons/gi";
import { LuRabbit, LuBird } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./AnimalCard.css";

const AnimalCard = ({
  userType,
  pet,
  fields,
  fieldLabels,
  navigateTo,
  modifyPath,
  deletePath,
}) => {
  const navigate = useNavigate();

  const getAnimalIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pies":
        return <FaDog className="pets-icon" />;
      case "kot":
        return <FaCat className="pets-icon" />;
      case "żółw":
        return <GiTurtle className="pets-icon" />;
      case "królik":
        return <LuRabbit className="pets-icon" />;
      case "papuga":
        return <LuBird className="pets-icon" />;
      default:
        return <FaPaw className="pets-icon" />;
    }
  };

  return (
    <div className="pet-item">
      <div
        className="pet-details"
        onClick={() => navigate(navigateTo, { state: { pet } })}
        style={{ cursor: "pointer" }}
      >
        <div className="pet-header">
          <p className="name-field">Zwierzę</p>
          {getAnimalIcon(pet.typ_zwierzecia)}
        </div>

        {fields.map((field) => (
          <p key={field}>
            {fieldLabels[field]}: {pet[field]}
          </p>
        ))}

        {userType === "admin" && (
          <div className="pet-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(modifyPath, { state: { pet } });
              }}
              className="modify-btn"
            >
              Modyfikuj zwierzę
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(deletePath, { state: { pet } });
              }}
              className="delete-btn"
            >
              Usuń zwierzę
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;
