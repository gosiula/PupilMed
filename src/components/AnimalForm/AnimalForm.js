import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AnimalForm.css";
import { animal_data } from "../../data/animal_types";

const AnimalForm = ({
  fields,
  fieldLabels,
  fieldErrors,
  savedForm,
  buttonText,
  navigateTo,
}) => {
  const navigate = useNavigate();

  const initialFormData = JSON.parse(localStorage.getItem("animalForm")) || {};
  const initialCustomKind = initialFormData.customKind || false;

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field] = initialFormData[field] || "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState([]);
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const [isCustomKind, setIsCustomKind] = useState(initialCustomKind);

  const regexMap = {
    data_urodzenia: /^\d{2}\.\d{2}\.\d{4}$/,
    numer_telefonu_wlasciciela:
      /^(\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/,
    imie_zwierzecia: /^.+$/,
    dodatkowe_informacje: /^.*$/,
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("animalForm"));

    if (!storedFormData && savedForm) {
      setFormData((prev) => ({
        ...prev,
        ...savedForm,
      }));
      if (savedForm.typ_zwierzecia) {
        setAvailableBreeds(animal_data[savedForm.typ_zwierzecia] || []);
      }
      if (savedForm.customKind) {
        setIsCustomKind(savedForm.customKind);
      }
    }
  }, [savedForm]);

  useEffect(() => {
    if (formData.typ_zwierzecia) {
      setAvailableBreeds(animal_data[formData.typ_zwierzecia] || []);
    }
  }, [formData.typ_zwierzecia]);

  useEffect(() => {
    const handleNavigate = () => {
      if (window.location.pathname !== navigateTo) {
        // localStorage.clear();
      }
    };

    window.addEventListener("popstate", handleNavigate);
    return () => {
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  const validate = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field] || "";
      if (!value && field !== "dodatkowe_informacje") {
        newErrors[field] = `Podaj ${fieldErrors[field] || field}.`;
      } else if (regexMap[field] && !regexMap[field].test(value)) {
        newErrors[field] = `Nieprawidłowe dane.`;
      }
    });

    if (!formData.typ_zwierzecia) {
      newErrors.typ_zwierzecia = "Wybierz gatunek zwierzęcia.";
    }

    if (!formData.rasa && !isCustomKind) {
      newErrors.rasa = "Wybierz rasę zwierzęcia.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleSpeciesChange = (e) => {
    const typ_zwierzecia = e.target.value;
    setFormData((prev) => ({
      ...prev,
      typ_zwierzecia,
      rasa: "",
    }));
    setAvailableBreeds(animal_data[typ_zwierzecia] || []);
    setErrors((prev) => ({ ...prev, rasa: null }));
  };

  const handleCustomKindToggle = (e) => {
    setIsCustomKind(e.target.checked);
    if (!e.target.checked) {
      setFormData((prev) => ({ ...prev, rasa: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(navigateTo, {
        state: { formData },
      });
    }
  };

  useEffect(() => {
    const formDataToSave = fields.reduce((acc, field) => {
      acc[field] = formData[field];
      return acc;
    }, {});

    localStorage.setItem(
      "animalForm",
      JSON.stringify({ ...formDataToSave, customKind: isCustomKind })
    );
  }, [formData, fields, isCustomKind]);

  return (
    <div className="animal-form-container">
      <form onSubmit={handleSubmit} className="animal-form-layout">
        {fields.map((field, index) => {
          if (field === "typ_zwierzecia") {
            return (
              <div key={index} className="animal-input-container">
                <label htmlFor="typ_zwierzecia" className="animal-input-label">
                  Gatunek zwierzęcia:
                </label>
                {isCustomKind ? (
                  <input
                    id="typ_zwierzecia"
                    type="text"
                    value={formData.typ_zwierzecia || ""}
                    onChange={handleInputChange}
                    className={`animal-input-field ${
                      errors.typ_zwierzecia ? "animal-error-input" : ""
                    }`}
                  />
                ) : (
                  <select
                    id="typ_zwierzecia"
                    value={formData.typ_zwierzecia}
                    onChange={handleSpeciesChange}
                    className={`animal-input-field ${
                      errors.typ_zwierzecia ? "animal-error-input" : ""
                    }`}
                  >
                    <option value="">Wybierz gatunek</option>
                    {Object.keys(animal_data).map((typ_zwierzecia) => (
                      <option key={typ_zwierzecia} value={typ_zwierzecia}>
                        {typ_zwierzecia.charAt(0).toUpperCase() +
                          typ_zwierzecia.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
                {errors.typ_zwierzecia && (
                  <p className="animal-error-text visible">
                    {errors.typ_zwierzecia}
                  </p>
                )}
              </div>
            );
          }

          if (field === "rasa") {
            return (
              <div key={index} className="animal-input-container">
                <label htmlFor="rasa" className="animal-input-label">
                  Rasa zwierzęcia:
                </label>
                {isCustomKind ? (
                  <input
                    id="rasa"
                    type="text"
                    value={formData.rasa || ""}
                    onChange={handleInputChange}
                    className={`animal-input-field ${
                      errors.rasa ? "animal-error-input" : ""
                    }`}
                  />
                ) : (
                  <select
                    id="rasa"
                    value={formData.rasa || ""}
                    onChange={handleInputChange}
                    className={`animal-input-field ${
                      errors.rasa ? "animal-error-input" : ""
                    }`}
                    disabled={!formData.typ_zwierzecia}
                  >
                    <option value="">Wybierz rasę</option>
                    {availableBreeds.map((rasa) => (
                      <option key={rasa} value={rasa}>
                        {rasa}
                      </option>
                    ))}
                  </select>
                )}
                {errors.rasa && (
                  <p className="animal-error-text visible">{errors.rasa}</p>
                )}
              </div>
            );
          }

          if (field === "dodatkowe_informacje") {
            return (
              <div key={index} className="animal-input-container">
                <label
                  htmlFor="dodatkowe_informacje"
                  className="animal-input-label"
                >
                  Dodatkowe informacje:
                </label>
                <textarea
                  id="dodatkowe_informacje"
                  value={formData.dodatkowe_informacje || ""}
                  onChange={handleInputChange}
                  className={`animal-input-field ${
                    errors.dodatkowe_informacje ? "animal-error-input" : ""
                  }`}
                />
                {errors.dodatkowe_informacje && (
                  <p className="animal-error-text visible">
                    {errors.dodatkowe_informacje}
                  </p>
                )}
              </div>
            );
          }

          return (
            <div key={index} className="animal-input-container">
              <label htmlFor={field} className="animal-input-label">
                {fieldLabels[field] || field}:
              </label>
              <input
                id={field}
                type="text"
                className={`animal-input-field ${
                  errors[field] ? "animal-error-input" : ""
                }`}
                value={formData[field] || ""}
                onChange={handleInputChange}
              />
              {errors[field] && (
                <p className="animal-error-text visible">{errors[field]}</p>
              )}
            </div>
          );
        })}

        <div className="animal-input-container">
          <label className="animal-input-label">
            <input
              type="checkbox"
              checked={isCustomKind}
              onChange={handleCustomKindToggle}
            />{" "}
            Rasa spoza listy
          </label>
        </div>

        <button type="submit" className="go-add-animal-button">
          {buttonText || "Dodaj zwierzaka"}
        </button>
      </form>
    </div>
  );
};

export default AnimalForm;
