import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AnimalForm.css";

const AnimalForm = ({
  fields,
  fieldLabels,
  fieldErrors,
  savedForm,
  buttonText,
  navigateTo,
  animalData,
  petID,
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
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("animalForm"));

    if (!storedFormData && savedForm) {
      const isSpeciesCustom =
        savedForm.petSpecies &&
        !Object.keys(animalData).includes(savedForm.petSpecies);

      const isBreedCustom =
        savedForm.petBreed &&
        (!savedForm.petSpecies ||
          !animalData[savedForm.petSpecies]?.includes(savedForm.petBreed));

      setFormData((prev) => ({
        ...prev,
        ...savedForm,
      }));
      if (isSpeciesCustom || isBreedCustom) {
        setIsCustomKind(true);
      } else if (savedForm.petSpecies) {
        setAvailableBreeds(animalData[savedForm.petSpecies] || []);
      }

      if (savedForm.customKind) {
        setIsCustomKind(savedForm.customKind);
      }
    }
  }, [savedForm]);

  useEffect(() => {
    if (formData.petSpecies) {
      setAvailableBreeds(animalData[formData.petSpecies] || []);
    }
  }, [formData.petSpecies]);

  useEffect(() => {
    const handleNavigate = () => {
      if (window.location.pathname !== navigateTo) {
        localStorage.removeItem("animalForm");
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
      if (!value && field !== "additionalInfo") {
        newErrors[field] = `Podaj ${fieldErrors[field] || field}.`;
      } else if (regexMap[field] && !regexMap[field].test(value)) {
        newErrors[field] = `Nieprawidłowe dane.`;
      }
    });

    if (!formData.petSpecies) {
      newErrors.petSpecies = "Wybierz gatunek zwierzęcia.";
    }

    if (!formData.petBreed && !isCustomKind) {
      newErrors.petBreed = "Wybierz rasę zwierzęcia.";
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
    const petSpecies = e.target.value;
    setFormData((prev) => ({
      ...prev,
      petSpecies,
      petBreed: "",
    }));
    setAvailableBreeds(animalData[petSpecies] || []);
    setErrors((prev) => ({ ...prev, petBreed: null }));
  };

  const handleCustomKindToggle = (e) => {
    setIsCustomKind(e.target.checked);
    if (!e.target.checked) {
      setFormData((prev) => ({ ...prev, petBreed: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(navigateTo, {
        state: { formData, petID },
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
          if (field === "petSpecies") {
            return (
              <div key={index} className="animal-input-container">
                <label htmlFor="petSpecies" className="animal-input-label">
                  Gatunek zwierzęcia:
                </label>
                {isCustomKind ? (
                  <input
                    id="petSpecies"
                    type="text"
                    value={formData.petSpecies || ""}
                    onChange={handleInputChange}
                    className={`animal-input-field ${
                      errors.petSpecies ? "animal-error-input" : ""
                    }`}
                  />
                ) : (
                  <select
                    id="petSpecies"
                    value={formData.petSpecies}
                    onChange={handleSpeciesChange}
                    className={`animal-input-field ${
                      errors.petSpecies ? "animal-error-input" : ""
                    }`}
                  >
                    <option value="">Wybierz gatunek</option>
                    {Object.keys(animalData).map((petSpecies) => (
                      <option key={petSpecies} value={petSpecies}>
                        {petSpecies.charAt(0).toUpperCase() +
                          petSpecies.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
                {errors.petSpecies && (
                  <p className="animal-error-text visible">
                    {errors.petSpecies}
                  </p>
                )}
              </div>
            );
          }

          if (field === "petBreed") {
            return (
              <div key={index} className="animal-input-container">
                <label htmlFor="petBreed" className="animal-input-label">
                  Rasa zwierzęcia:
                </label>
                {isCustomKind ? (
                  <input
                    id="petBreed"
                    type="text"
                    value={formData.petBreed || ""}
                    onChange={handleInputChange}
                    className={`animal-input-field ${
                      errors.petBreed ? "animal-error-input" : ""
                    }`}
                  />
                ) : (
                  <select
                    id="petBreed"
                    value={formData.petBreed || ""}
                    onChange={handleInputChange}
                    className={`animal-input-field ${
                      errors.petBreed ? "animal-error-input" : ""
                    }`}
                    disabled={!formData.petSpecies}
                  >
                    <option value="">Wybierz rasę</option>
                    {availableBreeds.map((petBreed) => (
                      <option key={petBreed} value={petBreed}>
                        {petBreed}
                      </option>
                    ))}
                  </select>
                )}
                {errors.petBreed && (
                  <p className="animal-error-text visible">{errors.petBreed}</p>
                )}
              </div>
            );
          }

          if (field === "additionalInfo") {
            return (
              <div key={index} className="animal-input-container">
                <label
                  htmlFor="additionalInfo"
                  className="animal-input-label"
                >
                  Dodatkowe informacje:
                </label>
                <textarea
                  id="additionalInfo"
                  value={formData?.additionalInfo || ""}
                  onChange={handleInputChange}
                  className={`animal-input-field ${
                    errors.additionalInfo ? "animal-error-input" : ""
                  }`}
                />
                {errors.additionalInfo && (
                  <p className="animal-error-text visible">
                    {errors.additionalInfo}
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
