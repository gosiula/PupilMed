import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainWhiteBox from "../../components/MainWhiteBox/MainWhiteBox";
import LogoContainer from "../../components/LogoContainer/LogoContainer";
import "./HomePage.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-background-gradient">
      <header>
        <MainWhiteBox title="Witaj w aplikacji" subtitle="PupilMed">
          <p className="small-text">Przejdź dalej, aby się zalogować.</p>
          <button className="login-button" onClick={handleLoginClick}>
            Przejdź do logowania
          </button>
        </MainWhiteBox>
        <LogoContainer />
      </header>
    </div>
  );
}

export default App;
