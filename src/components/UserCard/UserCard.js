import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import "./UserCard.css";

const UserCard = ({
  userType,
  user,
  fields,
  fieldLabels,
  modifyPath,
  deletePath,
}) => {
  const navigate = useNavigate();

  const getUserIcon = (type) => {
    switch (type.toLowerCase()) {
      case "owner":
        return <FaUser className="user-icon" />;
      case "vet":
        return <FaUserDoctor className="user-icon" />;
      default:
        return <FaUser className="user-icon" />;
    }
  };

  console.log(user?.id)

  return (
    <div className="user-item">
      <div className="user-details">
        <div className="user-header">
          <p className="user-name-field">
            Użytkownik -{" "}
            {user?.role === "OWNER" ? "właściciel" : "weterynarz"}
          </p>
          {getUserIcon(user?.role)}
        </div>

        {fields.map((field) => (
          <p key={field}>
            {fieldLabels[field]}: {user[field]}
          </p>
        ))}

        {userType === "admin" && (
          <div className="user-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(modifyPath, {
                  state: { formData: user, userID: user?.id },
                });
              }}
              className="user-modify-btn"
            >
              Modyfikuj użytkownika
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(deletePath, {
                  state: { formData: user, userID: user?.id },
                });
              }}
              className="user-delete-btn"
            >
              Usuń użytkownika
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
