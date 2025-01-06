import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VisitForm.css";

const VisitForm = ({
  fields,
  fieldLabels,
  fieldErrors,
  visitTypes,
  navigateTo,
  savedForm,
  buttonText,
}) => {
  const navigate = useNavigate();

  const initialFormData = fields.reduce((acc, field) => {
    const storedValue = localStorage.getItem(field);
    return { ...acc, [field]: storedValue || "" };
  }, {});

  const initialTypwizyty = localStorage.getItem("typ_wizyty") || "";
  const initialCena = localStorage.getItem("cena") || "";

  const [formData, setFormData] = useState({
    ...initialFormData,
    typ_wizyty: initialTypwizyty,
    cena: initialCena,
  });

  const [errors, setErrors] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (visitTypes[formData.typ_wizyty] && initialLoad) {
      setFormData((prev) => ({
        ...prev,
      }));
      setInitialLoad(false);
    } else if (
      formData.typ_wizyty !== initialTypwizyty &&
      visitTypes[formData.typ_wizyty]
    ) {
      setFormData((prev) => ({
        ...prev,
        cena: visitTypes[formData.typ_wizyty],
      }));
    }
  }, [formData.typ_wizyty, visitTypes, initialTypwizyty]);

  useEffect(() => {
    if (
      savedForm &&
      Object.values(initialFormData).some((value) => value === "")
    ) {
      setFormData((prev) => ({
        ...prev,
        ...savedForm,
      }));
    }
  }, [savedForm]);

  useEffect(() => {
    fields.forEach((field) => {
      localStorage.setItem(field, formData[field]);
    });

    localStorage.setItem("typ_wizyty", formData.typ_wizyty);
    localStorage.setItem("cena", formData.cena);
  }, [formData, fields]);

  const validate = () => {
    const newErrors = {};

    const regexMap = {
      data: /^\d{2}\.\d{2}\.\d{4}$/,
      godzina: /^\d{2}:\d{2}$/,
      numer_telefonu_weterynarza:
        /^(\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/,
      numer_telefonu_wlasciciela:
        /^(\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/,
      imie_zwierzecia: /^.+$/,
      cena: /^\d+([.,]\d{1,2})?$/, // Akceptuje kropkę i przecinek
    };

    fields.forEach((field) => {
      const value = formData[field] || "";
      if (!value) {
        newErrors[field] = `Podaj ${fieldErrors[field] || field}.`;
      } else if (regexMap[field] && !regexMap[field].test(value)) {
        newErrors[field] = `Nieprawidłowe dane.`;
      }
    });

    if (!formData.typ_wizyty) {
      newErrors.typ_wizyty = "Wybierz typ wizyty.";
    }

    if (!formData.cena) {
      newErrors.cena = "Podaj cenę.";
    } else if (!regexMap.cena.test(formData.cena)) {
      newErrors.cena = "Nieprawidłowe dane.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const sanitizedValue = id === "cena" ? value.replace(",", ".") : value;

    setFormData((prev) => ({
      ...prev,
      [id]: sanitizedValue,
      ...(id === "typ_wizyty" && visitTypes[value] && !savedForm?.cena
        ? { cena: visitTypes[value] }
        : {}),
    }));

    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(navigateTo, { state: { formData } });
    }
  };

  useEffect(() => {
    const handleNavigate = () => {
      if (window.location.pathname !== navigateTo) {
        fields.forEach((field) => localStorage.removeItem(field));
        localStorage.clear();
      }
    };

    window.addEventListener("popstate", handleNavigate);
    return () => {
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-layout">
        {fields.map((field, index) => (
          <div key={index} className="input-container">
            <label htmlFor={field} className="input-label">
              {fieldLabels[field] || field}:
            </label>
            <input
              id={field}
              type="text"
              className={`visit-input-field ${
                errors[field] ? "error-input" : ""
              }`}
              value={formData[field] || ""}
              onChange={handleInputChange}
            />
            {errors[field] && (
              <p className="error-text visible">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="input-container">
          <label htmlFor="typ_wizyty" className="input-label">
            Typ wizyty:
          </label>
          <select
            id="typ_wizyty"
            className={`visit-input-field ${
              errors.typ_wizyty ? "error-input" : ""
            }`}
            value={formData.typ_wizyty || ""}
            onChange={handleInputChange}
          >
            <option value="">Wybierz typ wizyty</option>
            {Object.keys(visitTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.typ_wizyty && (
            <p className="error-text visible">{errors.typ_wizyty}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="cena" className="input-label">
            Cena:
          </label>
          <input
            id="cena"
            type="text"
            className={`visit-input-field ${errors.cena ? "error-input" : ""}`}
            value={formData.cena || ""}
            onChange={handleInputChange}
          />
          {errors.cena && <p className="error-text visible">{errors.cena}</p>}
        </div>

        <button type="submit" className="add-visit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default VisitForm;
