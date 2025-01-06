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
      case "wlasciciel":
        return <FaUser className="user-icon" />;
      case "weterynarz":
        return <FaUserDoctor className="user-icon" />;
      default:
        return <FaUser className="user-icon" />;
    }
  };

  return (
    <div className="user-item">
      <div className="user-details">
        <div className="user-header">
          <p className="user-name-field">
            Użytkownik - {user.typ === "wlasciciel" ? "właściciel" : user.typ}
          </p>
          {getUserIcon(user.typ)}
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
                navigate(modifyPath, { state: { user } });
              }}
              className="user-modify-btn"
            >
              Modyfikuj użytkownika
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(deletePath, { state: { user } });
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
