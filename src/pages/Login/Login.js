import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainWhiteBox from "../../components/MainWhiteBox/MainWhiteBox";
import LogoContainer from "../../components/LogoContainer/LogoContainer";
import "./Login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (loggedInUser) {
      if (loggedInUser.typ === "admin") {
        navigate("/admin/visits");
      } else if (loggedInUser.typ === "wlasciciel") {
        navigate("/owner/visits");
      } else if (loggedInUser.typ === "weterynarz") {
        navigate("/vet/visits");
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!phone || !password) {
      setError("Podaj numer telefonu i hasło.");
      return;
    }
    try {
      const user = login({ phone, password });
      if (user.typ === "admin") navigate("/admin/visits");
      else if (user.typ === "wlasciciel") navigate("/owner/visits");
      else if (user.typ === "weterynarz") navigate("/vet/visits");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-background-gradient">
      <header>
        <MainWhiteBox title={`Zaloguj się \ndo aplikacji.`}>
          <div className="login-form">
            <label htmlFor="phone" className="form-label">
              Numer telefonu
            </label>
            <input
              type="text"
              id="phone"
              className="input-field"
              placeholder="Wpisz numer telefonu"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Wpisz hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
          <button className="login-button2" onClick={handleLogin}>
            Zaloguj się
          </button>
        </MainWhiteBox>
        <LogoContainer />
      </header>
    </div>
  );
}

export default Login;
