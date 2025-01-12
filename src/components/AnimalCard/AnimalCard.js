import React from "react";
import { FaDog, FaCat, FaPaw } from "react-icons/fa6";
import { GiTurtle } from "react-icons/gi";
import { LuRabbit, LuBird } from "react-icons/lu";
import { formatAge } from "../../utils/formatAge";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
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
      // case "królik":
      //   return <LuRabbit className="pets-icon" />;
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
        onClick={() =>
          navigate(navigateTo, {
            state: { petID: pet?.id, petName: pet?.name },
          })
        }
        style={{ cursor: "pointer" }}
      >
        <div className="pet-header">
          <p className="name-field">Zwierzę</p>
          {getAnimalIcon(pet?.species)}
        </div>

        {fields.map((field) => (
          <p key={field}>
            {fieldLabels[field]}:{" "}
            {field === "age" ? formatAge(pet[field]) : pet[field]}
          </p>
        ))}

        {userType === "admin" && (
          <div className="pet-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(modifyPath, {
                  state: {
                    petID: pet?.id,
                    formData: {
                      ownerPhoneNumber: pet?.ownerPhoneNumber,
                      petName: pet?.name,
                      additionalInfo: pet?.additionalInfo,
                      petDob: formatDate(pet?.dateOfBirth),
                      petBreed: pet?.breed,
                      petSpecies: pet?.species,
                    },
                  },
                });
              }}
              className="modify-btn"
            >
              Modyfikuj zwierzę
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(deletePath, {
                  state: {
                    petID: pet?.id,
                    petName: pet?.name,
                    ownerPhoneNumber: pet?.ownerPhoneNumber,
                  },
                });
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
