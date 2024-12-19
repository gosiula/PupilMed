import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AdminHeader from "../AdminHeader";
import "../../OwnerAndVet.css";
import "../Admin.css";
import "./Pets.css";
import {useLocation, useNavigate} from "react-router-dom";

const kindTypeMapping = [
  { kind: "Buldog", type: "Pies" },
  { kind: "Bengalski", type: "Kot" },
  { kind: "Kanarek", type: "Ptak" },
];

function AdminEditVisit({ onSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pet = location.state?.pets;

  const [isCustomKind, setIsCustomKind] = useState(false);
  const [formData, setFormData] = useState({
    name: pet?.name || "",
    age: pet?.age || "",
    type: pet?.type || "",
    kind: pet?.kind || "",
    additional_info: pet?.additional_info || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const matchedKind = kindTypeMapping.find((item) => item.kind === formData.kind);
    if (matchedKind) {
      setFormData((prevData) => ({ ...prevData, type: matchedKind.type }));
    }
  }, [formData.kind]);

  const handleCustomKindToggle = (e) => {
    const isChecked = e.target.checked;
    setIsCustomKind(isChecked);
    if (isChecked) {
      setFormData((prevData) => ({
        ...prevData,
        kind: "",
        type: "",
        customKind: "",
        customType: "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        customKind: "",
        customType: "",
      }));
    }
    setErrors({});
  };
  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Podaj imię zwierzaka.";
    }

    if (!formData.age || isNaN(formData.age) || parseInt(formData.age) <= 0) {
      newErrors.age = "Podaj poprawny wiek zwierzaka.";
    }

    if (isCustomKind) {
      // Walidacja dla niestandardowej rasy
      if (!formData.customKind) {
        newErrors.customKind = "Podaj rasę zwierzaka.";
      }
      if (!formData.customType) {
        newErrors.customType = "Podaj gatunek zwierzaka.";
      }
    } else {
      // Walidacja dla standardowej rasy
      if (!formData.kind) {
        newErrors.kind = "Wybierz rasę zwierzaka.";
      }
      if (!formData.type) {
        newErrors.type = "Gatunek zwierzaka nie został określony.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [id]: value };

      if (id === "kind" && !isCustomKind) {
        // Automatyczne ustawienie typu na podstawie wybranej rasy
        const matchedKind = kindTypeMapping.find((item) => item.kind === value);
        updatedData.type = matchedKind ? matchedKind.type : "";
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
      navigate("/admin-confirm-modify-pet", {
        state: { formData },
      });
    }
  };

  return (
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
        <AdminHeader />
        <div className="header-container">
          <button className="back-button" onClick={() => navigate('/admin-pets')}>
            <FaArrowLeft className="back-icon" />
          </button>
          <p className="text2">Modyfikacja zwierzaka</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="name" className="input-label">
                Imię zwierzaka:
              </label>
              <input
                  id="name"
                  type="text"
                  className={`input-field ${errors.name ? "error-input" : ""}`}
                  value={formData.name}
                  onChange={handleInputChange}
              />
              {errors.name && <p className="error-text visible">{errors.name}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="age" className="input-label">
                Wiek zwierzaka:
              </label>
              <input
                  id="age"
                  type="number"
                  className={`input-field ${errors.age ? "error-input" : ""}`}
                  value={formData.age}
                  onChange={handleInputChange}
              />
              {errors.age && <p className="error-text visible">{errors.age}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="kind" className="input-label">
                Rasa zwierzaka:
              </label>
              {!isCustomKind ? (
                  <select
                      id="kind"
                      className={`input-field ${errors.kind ? "error-input" : ""}`}
                      value={formData.kind}
                      onChange={handleInputChange}
                  >
                    <option value="">Wybierz rasę</option>
                    {kindTypeMapping.map((item) => (
                        <option key={item.kind} value={item.kind}>
                          {item.kind}
                        </option>
                    ))}
                  </select>
              ) : (
                  <input
                      id="customKind"
                      type="text"
                      className={`input-field ${
                          errors.customKind ? "error-input" : ""
                      }`}
                      value={formData.customKind}
                      onChange={handleInputChange}
                      placeholder="Podaj rasę zwierzaka"
                  />
              )}
              {errors.kind && <p className="error-text visible">{errors.kind}</p>}
              {errors.customKind && (
                  <p className="error-text visible">{errors.customKind}</p>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="type" className="input-label">
                Gatunek zwierzaka:
              </label>
              {!isCustomKind ? (
                  <input
                      id="type"
                      type="text"
                      className={`input-field ${errors.type ? "error-input" : ""}`}
                      value={formData.type}
                      readOnly
                  />
              ) : (
                  <input
                      id="customType"
                      type="text"
                      className={`input-field ${
                          errors.customType ? "error-input" : ""
                      }`}
                      value={formData.customType}
                      onChange={handleInputChange}
                      placeholder="Podaj gatunek zwierzaka"
                  />
              )}
              {errors.type && <p className="error-text visible">{errors.type}</p>}
              {errors.customType && (
                  <p className="error-text visible">{errors.customType}</p>
              )}
            </div>

            <div className="input-container">
              <label className="input-label">
                <input
                    type="checkbox"
                    checked={isCustomKind}
                    onChange={handleCustomKindToggle}
                />{" "}
                Rasa spoza listy
              </label>
            </div>

            <div className="input-container">
              <label htmlFor="additional_info" className="input-label">
                Dodatkowe informacje:
              </label>
              <textarea
                  id="additional_info"
                  className="input-field"
                  value={formData.additional_info}
                  onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="add-visit-button2">
              Zapisz zmiany
            </button>
          </form>
        </div>
      </div>
  );
}

export default AdminEditVisit;
