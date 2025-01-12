import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminUsers.css";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import UserCard from "../../../../components/UserCard/UserCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../../../../App.css";

function AdminUsers() {
  const navigate = useNavigate();

  const fieldsToDisplay = ["name", "surname", "phoneNumber"];

  const fieldLabels = {
    name: "Imię",
    surname: "Nazwisko",
    phoneNumber: "Numer telefonu",
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSurname, setSearchSurname] = useState("");
  const [showVets, setShowVets] = useState(true);
  const [showOwners, setShowOwners] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;

        if (!token) {
          throw new Error("Token not found");
        }

        const resp = await fetch("http://localhost:8080/admin/get-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) {
          throw new Error(`Failed to fetch users data: ${resp.statusText}`);
        }

        const json = await resp.json();
        setUsers(json);
        setFilteredUsers(json);
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const matchesSurname = user.surname
        .toLowerCase()
        .includes(searchSurname.toLowerCase());
      const matchesRole =
        (showVets && user.role === "VET") ||
        (showOwners && user.role === "OWNER");
      return matchesSurname && matchesRole;
    });
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [searchSurname, showVets, showOwners, users]);

  return (
    <div className="main-container-users" style={{ position: "relative" }}>
      <AdminHeader />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={showVets}
                onChange={() => setShowVets(!showVets)}
              />
              Weterynarze
            </label>
            <label>
              <input
                type="checkbox"
                checked={showOwners}
                onChange={() => setShowOwners(!showOwners)}
              />
              Właściciele
            </label>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Wpisz nazwisko"
              value={searchSurname}
              onChange={(e) => setSearchSurname(e.target.value)}
              className="search-input"
            />
          </div>

          {/* User cards */}
          {filteredUsers.map((user, index) => (
            <UserCard
              userType={"admin"}
              key={index}
              user={user}
              fields={fieldsToDisplay}
              fieldLabels={fieldLabels}
              modifyPath={`/admin/users/user/modify`}
              deletePath={`/admin/users/user/delete`}
            />
          ))}

          <button
            onClick={() => navigate("/admin/users/add-user")}
            className="add-user-button"
          >
            Dodaj użytkownika
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
