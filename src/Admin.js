import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  
  // obsługa wylogowania
  const handleLogout = () => {
    // usuwamy dane logowania
    localStorage.removeItem("isLoggedIn"); // usuwamy informację o logowaniu
    navigate("/"); // przekierowujemy na stronę początkową
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <p>Hejka Krysia! &lt;3</p>
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
}

export default Admin;
