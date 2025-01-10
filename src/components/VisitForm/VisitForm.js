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
  visitID,
  buttonText,
}) => {
  const navigate = useNavigate();

  const initialFormData = fields.reduce((acc, field) => {
    const storedValue = localStorage.getItem(field);
    return { ...acc, [field]: storedValue || "" };
  }, {});

  const initialTypwizyty = localStorage.getItem("visitType") || "";
  const initialCena = localStorage.getItem("price") || "";

  const [formData, setFormData] = useState({
    ...initialFormData,
    visitType: initialTypwizyty,
    price: initialCena,
  });

  const [errors, setErrors] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (visitTypes[formData.visitType] && initialLoad) {
      setFormData((prev) => ({
        ...prev,
      }));
      setInitialLoad(false);
    } else if (
      formData.visitType !== initialTypwizyty &&
      visitTypes[formData.visitType]
    ) {
      setFormData((prev) => ({
        ...prev,
        price: visitTypes[formData.visitType],
      }));
    }
  }, [formData.visitType, visitTypes, initialTypwizyty]);

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

    localStorage.setItem("visitType", formData.visitType);
    localStorage.setItem("price", formData.price);
  }, [formData, fields]);

  const validate = () => {
    const newErrors = {};

    const regexMap = {
      date: /^\d{2}\.\d{2}\.\d{4}$/,
      hour: /^\d{2}:\d{2}$/,
      ownerPhoneNumber:
        /^(\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/,
      vetPhoneNumber:
        /^(\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/,
      petName: /^.+$/,
      price: /^\d+([.,]\d{1,2})?$/,
    };

    fields.forEach((field) => {
      const value = formData[field] || "";
      if (!value) {
        newErrors[field] = `Podaj ${fieldErrors[field] || field}.`;
      } else if (regexMap[field] && !regexMap[field].test(value)) {
        newErrors[field] = `Nieprawidłowe dane.`;
      }
    });

    if (!formData.visitType) {
      newErrors.visitType = "Wybierz typ wizyty.";
    }

    if (!formData.price) {
      newErrors.price = "Podaj cenę.";
    } else if (!regexMap.price.test(formData.price)) {
      newErrors.price = "Nieprawidłowe dane.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const sanitizedValue = id === "price" ? value.replace(",", ".") : value;

    setFormData((prev) => ({
      ...prev,
      [id]: sanitizedValue,
      ...(id === "visitType" && visitTypes[value] && !savedForm?.cena
        ? { price: visitTypes[value] }
        : {}),
    }));

    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(navigateTo, { state: { formData, visitID } });
    }
  };

  useEffect(() => {
    const handleNavigate = () => {
      if (window.location.pathname !== navigateTo) {
        fields.forEach((field) => localStorage.removeItem(field));
        localStorage.removeItem("visitType");
        localStorage.removeItem("price");
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
          <label htmlFor="visitType" className="input-label">
            Typ wizyty:
          </label>
          <select
            id="visitType"
            className={`visit-input-field ${
              errors.visitType ? "error-input" : ""
            }`}
            value={formData.visitType || ""}
            onChange={handleInputChange}
          >
            <option value="">Wybierz typ wizyty</option>
            {Object.keys(visitTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.visitType && (
            <p className="error-text visible">{errors.visitType}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="price" className="input-label">
            Cena:
          </label>
          <input
            id="price"
            type="text"
            className={`visit-input-field ${errors.price ? "error-input" : ""}`}
            value={formData.price || ""}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error-text visible">{errors.price}</p>}
        </div>

        <button type="submit" className="add-visit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default VisitForm;
