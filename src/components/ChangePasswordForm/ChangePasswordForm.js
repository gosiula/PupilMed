import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePasswordForm.css";

const ChangePasswordForm = ({ navigateTo }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    newPasswordMismatch: false,
    currentPasswordEmpty: false,
    newPasswordEmpty: false,
    confirmNewPasswordEmpty: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({
      currentPasswordEmpty: !formData.currentPassword,
      newPasswordEmpty: !formData.newPassword,
      confirmNewPasswordEmpty: !formData.confirmNewPassword,
      newPasswordMismatch: formData.newPassword !== formData.confirmNewPassword,
    });

    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.confirmNewPassword &&
      formData.newPassword === formData.confirmNewPassword
    ) {
      navigate(navigateTo);
    }
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <div className="password-input-container">
        <label htmlFor="currentPassword" className="password-input-label">
          Wpisz obecne hasło:
        </label>
        <input
          id="currentPassword"
          type="password"
          className={`password-input-field ${
            errors.currentPasswordEmpty ? "password-error-input" : ""
          }`}
          value={formData.currentPassword}
          onChange={handleInputChange}
        />
        {errors.currentPasswordEmpty && (
          <p className="password-error-text visible">Podaj obecne hasło.</p>
        )}
      </div>

      <div className="password-input-container">
        <label htmlFor="newPassword" className="password-input-label">
          Wpisz nowe hasło:
        </label>
        <input
          id="newPassword"
          type="password"
          className={`password-input-field ${
            errors.newPasswordEmpty || errors.newPasswordMismatch
              ? "password-error-input"
              : ""
          }`}
          value={formData.newPassword}
          onChange={handleInputChange}
        />
        {errors.newPasswordEmpty && (
          <p className="password-error-text visible">Podaj nowe hasło.</p>
        )}
      </div>

      <div className="password-input-container">
        <label htmlFor="confirmNewPassword" className="password-input-label">
          Wpisz ponownie nowe hasło:
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          className={`password-input-field ${
            errors.confirmNewPasswordEmpty || errors.newPasswordMismatch
              ? "password-error-input"
              : ""
          }`}
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
        />
        {errors.confirmNewPasswordEmpty && (
          <p className="password-error-text visible">
            Podaj ponownie nowe hasło.
          </p>
        )}
        {errors.newPasswordMismatch && (
          <p className="password-error-text visible">
            Nowe hasła nie są takie same.
          </p>
        )}
      </div>

      <button type="submit" className="change-password-button">
        Zmień hasło
      </button>
    </form>
  );
};

export default ChangePasswordForm;
