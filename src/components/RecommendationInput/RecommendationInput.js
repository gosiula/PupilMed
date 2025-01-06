import React, { useState, useEffect } from "react";
import "./RecommendationInput.css";

const RecommendationInput = ({
  savedRecommendation,
  buttonText,
  onSubmit,
  date,
  hour,
}) => {
  const initialRecommendation =
    localStorage.getItem("zalecenie") || savedRecommendation || "";

  const [recommendation, setRecommendation] = useState(initialRecommendation);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recommendation) {
      localStorage.setItem("zalecenie", recommendation);
    }
  }, [recommendation]);

  const handleInputChange = (e) => {
    setRecommendation(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recommendation.trim()) {
      setError("Uzupełnij zalecenie.");
      return;
    }
    if (onSubmit) {
      onSubmit(recommendation);
    }
  };

  useEffect(() => {
    const handleNavigate = () => {
      if (
        window.location.pathname === `/admin/visits/visit/${date}_${hour}` ||
        window.location.pathname === "/admin/visits" ||
        window.location.pathname === "/admin/animals" ||
        window.location.pathname === "/admin/users" ||
        window.location.pathname === "/admin/logout"
      ) {
        localStorage.removeItem("zalecenie");
      }
    };

    window.addEventListener("popstate", handleNavigate);
    return () => {
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  return (
    <div className="recommendation-container">
      <label htmlFor="recommendation" className="recommendation-label">
        Zalecenie:
      </label>
      <textarea
        id="recommendation"
        className="input-field2"
        value={recommendation}
        onChange={handleInputChange}
        placeholder="Wpisz treść zalecenia..."
      />
      {error && <p className="error-text visible">{error}</p>}
      <button onClick={handleSubmit} className="add-recommendation-button2">
        {buttonText}
      </button>
    </div>
  );
};

export default RecommendationInput;
