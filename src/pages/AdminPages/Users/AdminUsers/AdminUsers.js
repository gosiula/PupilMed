import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminUsers.css";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import UserCard from "../../../../components/UserCard/UserCard";
import { admin_users } from "../../../../data/admin_users";

function AdminUsers() {
  const navigate = useNavigate();

  const fieldsToDisplay = ["imie", "nazwisko", "numer_telefonu"];

  const fieldLabels = {
    imie: "Imię",
    nazwisko: "Nazwisko",
    numer_telefonu: "Numer telefonu",
  };

  return (
    <div className="main-container-users" style={{ position: "relative" }}>
      <AdminHeader />
      {admin_users.map((user, index) => (
        <UserCard
          userType={"admin"}
          key={index}
          user={user}
          fields={fieldsToDisplay}
          fieldLabels={fieldLabels}
          modifyPath={`/admin/users/user/modify/${user.numer_telefonu}`}
          deletePath={`/admin/users/user/delete/${user.numer_telefonu}`}
        />
      ))}

      <button
        onClick={() => navigate("/admin/users/add-user")}
        className="add-user-button"
      >
        Dodaj użytkownika
      </button>
    </div>
  );
}

export default AdminUsers;
