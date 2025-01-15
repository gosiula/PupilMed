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
  activationPath,
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

  console.log(user?.id);

  return (
    <div className="user-item">
      <div className={`user-details ${user?.active ? "" : "inactive"}`}>
        <div className="user-header">
          <p className="user-name-field">
            Użytkownik - {user?.role === "OWNER" ? "właściciel" : "weterynarz"}
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
              className={`user-modify-btn ${
                user?.active ? "active" : "inactive"
              }`}
              disabled={!user?.active}
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
              className={"user-delete-btn"}
            >
              Usuń użytkownika
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(activationPath, {
                  state: {
                    formData: user,
                    userID: user?.id,
                    isActive: user?.active,
                  },
                });
              }}
              className={`user-activation-btn ${
                user?.active ? "active" : "inactive"
              }`}
            >
              {user?.active ? "Deaktywuj" : "Aktywuj"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
