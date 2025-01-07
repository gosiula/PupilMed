import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";

const UserForm = ({
  fields,
  fieldLabels,
  fieldErrors,
  savedForm,
  buttonText,
  navigateTo,
  type,
}) => {
  const navigate = useNavigate();

  const initialFormData = JSON.parse(localStorage.getItem("userForm")) || {};
  const initialUserType = initialFormData.userType || "";
  const initialClinicData = initialFormData.clinicData || {
    name: "",
    address: "",
  };

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field] =
        initialFormData[field] || (savedForm ? savedForm[field] : "");
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState(
    initialUserType || savedForm?.userType || ""
  );
  const [clinicData, setClinicData] = useState(
    initialClinicData || savedForm?.clinicData || { name: "", address: "" }
  );

  const regexMap = {
    numer_telefonu:
      /^\(\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3}\)$/,
    imie: /^.+$/,
    nazwisko: /^.+$/,
  };

  useEffect(() => {
    if (!Object.keys(initialFormData).length && savedForm) {
      setFormData((prev) => ({
        ...prev,
        ...savedForm,
      }));
      if (savedForm.typ === "weterynarz") {
        setUserType("vet");
        setClinicData({
          name: savedForm.nazwa_kliniki || "",
          address: savedForm.adres_kliniki || "",
        });
      } else if (savedForm.typ === "wlasciciel") {
        setUserType("owner");
      }
    }
  }, [savedForm, initialFormData]);

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
      if (!value) {
        newErrors[field] = `Podaj ${fieldErrors[field] || field}.`;
      } else if (regexMap[field] && !regexMap[field].test(value)) {
        newErrors[field] = `Nieprawidłowe dane.`;
      }
    });

    if (!userType) {
      newErrors.userType = "Wybierz typ użytkownika.";
    } else if (userType === "vet") {
      if (!clinicData.name) {
        newErrors.clinicName = "Podaj nazwę kliniki.";
      }
      if (!clinicData.address) {
        newErrors.clinicAddress = "Podaj adres kliniki.";
      }
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Podaj hasło.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleClinicInputChange = (e) => {
    const { id, value } = e.target;
    setClinicData((prev) => ({
      ...prev,
      [id === "clinicName" ? "name" : "address"]: value,
    }));

    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setErrors((prev) => ({ ...prev, userType: null }));
    if (type === "owner") {
      setClinicData({ name: "", address: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(navigateTo, {
        state: { formData, userType, clinicData },
      });
    }
  };

  useEffect(() => {
    const formDataToSave = fields.reduce((acc, field) => {
      acc[field] = formData[field];
      return acc;
    }, {});

    const dataToSave = {
      ...formDataToSave,
      userType,
      clinicData,
    };

    localStorage.setItem("userForm", JSON.stringify(dataToSave));
  }, [formData, fields, userType, clinicData]);

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form-layout">
        <div className="user-type-container">
          <label>
            <input
              type="radio"
              name="userType"
              value="owner"
              checked={userType === "owner"}
              onChange={() => handleUserTypeChange("owner")}
              disabled={!(type === "add")}
            />
            Właściciel
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="vet"
              checked={userType === "vet"}
              onChange={() => handleUserTypeChange("vet")}
              disabled={!(type === "add")}
            />
            Weterynarz
          </label>
        </div>
        {errors.userType && (
          <p className="user-error-text visible">{errors.userType}</p>
        )}
        <div className="user-input-container"></div>

        {fields.map((field, index) => (
          <div key={index} className="user-input-container">
            <label htmlFor={field} className="user-input-label">
              {fieldLabels[field] || field}:
            </label>
            <input
              id={field}
              type="text"
              className={`user-input-field ${
                errors[field] ? "user-error-input" : ""
              }`}
              value={formData[field] || ""}
              onChange={handleInputChange}
            />
            {errors[field] && (
              <p className="user-error-text visible">{errors[field]}</p>
            )}
          </div>
        ))}

        {userType === "vet" && (
          <div className="clinic-info-container">
            <div className="user-input-container">
              <label htmlFor="clinicName" className="user-input-label">
                Nazwa kliniki:
              </label>
              <input
                id="clinicName"
                type="text"
                className={`user-input-field ${
                  errors.clinicName ? "user-error-input" : ""
                }`}
                value={clinicData.name}
                onChange={(e) => handleClinicInputChange(e)}
              />
              {errors.clinicName && (
                <p className="user-error-text visible">{errors.clinicName}</p>
              )}
            </div>
            <div className="user-input-container">
              <label htmlFor="clinicAddress" className="user-input-label">
                Adres kliniki:
              </label>
              <input
                id="clinicAddress"
                type="text"
                className={`user-input-field ${
                  errors.clinicAddress ? "user-error-input" : ""
                }`}
                value={clinicData.address}
                onChange={(e) => handleClinicInputChange(e)}
              />
              {errors.clinicAddress && (
                <p className="user-error-text visible">
                  {errors.clinicAddress}
                </p>
              )}
            </div>
          </div>
        )}

        {type === "add" && (
          <div className="user-input-container">
            <label htmlFor="newPassword" className="user-input-label">
              Hasło:
            </label>
            <input
              id="newPassword"
              type="password"
              className={`user-input-field ${
                errors.newPassword ? "user-error-input" : ""
              }`}
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            {errors.newPassword && (
              <p className="user-error-text visible">{errors.newPassword}</p>
            )}
          </div>
        )}

        <button type="submit" className="go-add-user-button">
          {buttonText || "Dodaj użytkownika"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
