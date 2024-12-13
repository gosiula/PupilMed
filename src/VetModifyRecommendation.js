import React, { useState } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import "./OwnerAndVet.css";
import "./Vet.css";

const recommendation_info = {
  zalecenie:
    "Podawać leki przez 3 tygodnie. Zapisać się na wizytę kontrolną za miesiąc.",
};

const fieldMapping = {
  Zalecenie: "zalecenie",
};

const pola = Object.keys(fieldMapping);

function VetModifyRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { visitDate, visitHour } = location.state || {};

  const [formData, setFormData] = useState({
    zalecenie: recommendation_info.zalecenie || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.zalecenie) {
      newErrors.zalecenie = "Wpisz treść zalecenia.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [id]: value };
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
      navigate("/vetconfirmmodifyrecommendation", {
        state: { visitDate, visitHour, formData },
      });
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
        <button
          className="back-button"
          onClick={() => {
            navigate("/vetvisit", {
              state: { visitDate, visitHour },
            });
          }}
        >
          <FaArrowLeft className="back-icon" />
        </button>
        <p className="text2">
          Modyfikacja zalecenia - {visitDate} - {visitHour}
        </p>
      </div>

      <div className="form-container2">
        <form onSubmit={handleSubmit}>
          {pola.map((pole, index) => {
            const fieldName = fieldMapping[pole];
            return (
              <div key={index} className="input-container">
                <label htmlFor={fieldName} className="input-label">
                  {pole}:
                </label>
                <textarea
                  id={fieldName}
                  className={`input-field2 ${errors[fieldName] ? "error-input" : ""}`}
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

          <button type="submit" className="add-visit-button2">
            Modyfikuj zalecenie
          </button>
        </form>
      </div>
    </div>
  );
}

export default VetModifyRecommendation;
