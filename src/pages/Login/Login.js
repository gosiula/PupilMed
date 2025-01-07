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
    const auth = JSON.parse(localStorage.getItem("authData"));
    if (auth && auth.role) {
      if (auth.role === "ADMIN") {
        navigate("/admin/visits");
      } else if (auth.role === "OWNER") {
        console.log("hi im owner and ill go to /owner")
        navigate("/owner/visits");
      } else if (auth.role === "VET") {
        navigate("/vet/visits");
      }
    }
  }, [navigate]);


  const handleLogin = async () => {
    try {
      const body = {
        username: phone,
        password: password
      };

      const resp = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!resp.ok) {
        setError("Niepoprawny numer telefonu lub hasło");
        return;
      }

      const json = await resp.json();
      console.log(json)
      localStorage.setItem("authData", JSON.stringify(json));

      // Parsowanie danych i sprawdzanie roli
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (authData && authData.role) {
        console.log(authData.role)
        console.log(typeof authData.role)
        if (authData.role === "ADMIN") {
          navigate("/admin/visits");
        } else if (authData.role === "OWNER") {
          console.log("hi im owner and ill go to /owner")
          navigate("/owner/visits");
        } else if (authData.role === "VET") {
          navigate("/vet/visits");
        } else {
          setError("Nieznana rola użytkownika");
        }
      } else {
        setError("Niepoprawne dane logowania");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      setError("Wystąpił błąd podczas logowania");
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
