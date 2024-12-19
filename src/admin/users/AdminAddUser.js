import React, { useState } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import {useLocation, useNavigate} from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
// import "../../OwnerAndVet.css";
import "../Admin.css";
import AdminHeader from "../AdminHeader";

function AdminAddUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    numer_telefonu: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.imie) {
      newErrors.imie = "Podaj imię użytkownika.";
    }

    if (!formData.nazwisko) {
      newErrors.nazwisko = "Podaj nazwisko użytkownika.";
    }

    const phoneRegex = /^(?:\+48\s?)?\d{3}\s?\d{3}\s?\d{3}$/;
    if (!formData.numer_telefonu || !phoneRegex.test(formData.numer_telefonu)) {
      newErrors.numer_telefonu = "Podano niepoprawny numer telefonu.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    if (errors[id]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      navigate("/admin-confirm-add-user", {
        state: { formData },
      });
    }
  };

  return (
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
        <AdminHeader />

        <div className="header-container">
          <button className="back-button" onClick={() => navigate('/admin-users')}>
            <FaArrowLeft className="back-icon" />
          </button>
          <p className="text2">Modyfikacja użytkownika</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="imie" className="input-label">
                Imię użytkownika:
              </label>
              <input
                  id="imie"
                  type="text"
                  className={`input-field ${errors.imie ? "error-input" : ""}`}
                  value={formData.imie}
                  onChange={handleInputChange}
              />
              {errors.imie && <p className="error-text visible">{errors.imie}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="nazwisko" className="input-label">
                Nazwisko użytkownika:
              </label>
              <input
                  id="nazwisko"
                  className={`input-field ${errors.nazwisko ? "error-input" : ""}`}
                  value={formData.nazwisko}
                  onChange={handleInputChange}
              />
              {errors.nazwisko && <p className="error-text visible">{errors.nazwisko}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="numer_telefonu" className="input-label">
                Numer telefonu:
              </label>
              <input
                  id="numer_telefonu"
                  className={`input-field ${errors.numer_telefonu ? "error-input" : ""}`}
                  type="number"
                  value={formData.numer_telefonu}
                  onChange={handleInputChange}
              />
              {errors.numer_telefonu && <p className="error-text visible">{errors.numer_telefonu}</p>}
            </div>
            <button type="submit" className="add-visit-button2">
              Zapisz zmiany
            </button>
          </form>
        </div>
      </div>
  );
}

export default AdminAddUser;
