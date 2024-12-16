import React, { useState } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import "../OwnerAndVet.css";
import "./Vet.css";

// przykładowe typy wizyt
const visitTypes = {
  "Wizyta kontrolna": 50,
  Szczepienie: 100,
  Sterylizacja: 300,
  "Czyszczenie zębów": 200,
};

const fieldMapping = {
  "Data wizyty": "datawizyty",
  "Godzina wizyty": "godzinawizyty",
  "Numer telefonu właściciela": "numertelefonu",
  "Imię zwierzęcia": "imiezwierzecia",
};

const pola = Object.keys(fieldMapping);

function VetAddVisit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    datawizyty: "",
    godzinawizyty: "",
    rodzajwizyty: "",
    cena: "",
    numertelefonu: "",
    imiezwierzecia: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!formData.datawizyty || !dateRegex.test(formData.datawizyty)) {
      newErrors.datawizyty = "Podano złą datę.";
    }

    const timeRegex = /^\d{2}:\d{2}$/;
    if (!formData.godzinawizyty || !timeRegex.test(formData.godzinawizyty)) {
      newErrors.godzinawizyty = "Podano złą godzinę.";
    }

    if (!formData.rodzajwizyty) {
      newErrors.rodzajwizyty = "Wybierz rodzaj wizyty.";
    }

    if (
      !formData.cena ||
      isNaN(formData.cena) ||
      parseFloat(formData.cena) <= 0
    ) {
      newErrors.cena = "Cena wizyty jest niepoprawna.";
    }

    const phoneRegex = /^(?:\+48\s?)?\d{3}\s?\d{3}\s?\d{3}$/;
    if (!formData.numertelefonu || !phoneRegex.test(formData.numertelefonu)) {
      newErrors.numertelefonu = "Podano niepoprawny numer telefonu.";
    }

    if (!formData.imiezwierzecia) {
      newErrors.imiezwierzecia = "Podano niepoprawne imię zwierzęcia.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [id]: value };

      // automatyczne ustawienie ceny na podstawie rodzaju wizyty
      if (id === "rodzajwizyty" && visitTypes[value]) {
        updatedData.cena = visitTypes[value];
      }

      return updatedData;
    });

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
      navigate("/vetconfirmaddvisit", { state: { formData } });
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="current-button" onClick={() => navigate("/vet")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/vetaccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button className="owner-button" onClick={() => navigate("/vetlogout")}>
          <MdLogout className="owner-icon" />
          Wyloguj
        </button>
        <div className="logo-container">
          <p className="logo-text">PupilMed</p>
          <div className="heart-with-paw">
            <GoHeartFill className="heart-icon" />
            <IoPaw className="paw-icon" />
          </div>
        </div>
      </div>

      <div className="header-container">
        <button className="back-button" onClick={() => navigate("/vet")}>
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">Dodawanie wizyty</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {pola.map((pole, index) => {
            const fieldName = fieldMapping[pole];
            return (
              <div key={index} className="input-container">
                <label htmlFor={fieldName} className="input-label">
                  {pole}:
                </label>
                <input
                  id={fieldName}
                  type="text"
                  className={`input-field ${errors[fieldName] ? "error-input" : ""}`}
                  value={formData[fieldName] || ""}
                  onChange={handleInputChange}
                />
                {errors[fieldName] && (
                  <p
                    className={`error-text ${errors[fieldName] ? "visible" : ""}`}
                  >
                    {errors[fieldName]}
                  </p>
                )}
              </div>
            );
          })}

          <div className="input-container">
            <label htmlFor="rodzajwizyty" className="input-label">
              Rodzaj wizyty:
            </label>
            <select
              id="rodzajwizyty"
              className={`input-field ${errors.rodzajwizyty ? "error-input" : ""}`}
              value={formData.rodzajwizyty}
              onChange={handleInputChange}
            >
              <option value="">Wybierz rodzaj wizyty</option>
              {Object.keys(visitTypes).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.rodzajwizyty && (
              <p className="error-text visible">{errors.rodzajwizyty}</p>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="cena" className="input-label">
              Cena:
            </label>
            <input
              id="cena"
              type="text"
              className={`input-field ${errors.cena ? "error-input" : ""}`}
              value={formData.cena}
              onChange={handleInputChange}
            />
            {errors.cena && <p className="error-text visible">{errors.cena}</p>}
          </div>

          <button type="submit" className="add-visit-button2">
            Dodaj wizytę
          </button>
        </form>
      </div>
    </div>
  );
}

export default VetAddVisit;
