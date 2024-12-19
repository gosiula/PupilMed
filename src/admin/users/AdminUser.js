import React from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import { FaUser } from "react-icons/fa";
// import "../../OwnerAndVet.css";
import "../Admin.css";
import "../pets/Pets.css";
import AdminHeader from "../AdminHeader";
import {FaDog} from "react-icons/fa6";

const users = [{
  imie: "Ariana",
  nazwisko: "Konsultacja",
  numer_telefonu: "121212121",
}];

function AdminUser() {
  const navigate = useNavigate();
  return (
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>

        <AdminHeader />

          {users.map((user, index) => (
              <div key={index} className="pet-item">
                      <div className="pet-details">
                          <div className="pet-header">
                              <p className="name-field">Użytkownik</p>
                              <FaUser className="pets-icon" />
                  </div>
                  <p>Imię: {user.imie}</p>
                  <p>Nazwisko: {user.nazwisko}</p>
                  <p>Numer telefonu: {user.numer_telefonu}</p>

                  <div className="pet-buttons">
                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/admin-modify-user', { state: { user } });
                        }}
                        className="modify-btn"
                    >
                      Modyfikuj użytkownika
                    </button>
                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/admin-delete-user', { state: { user } });
                        }}
                        className="delete-btn"
                    >
                      Usuń użytkownika
                    </button>
                  </div>
                </div>
            </div>
        ))}

        <Link
            to="/admin-add-user"
            className="add-pet-btn"
        >
          Dodaj użytkownika
        </Link>
      </div>

  );
}

export default AdminUser;
