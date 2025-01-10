import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendationInput.css";

const RecommendationInput = ({
  savedRecommendation,
  buttonText,
  navigateTo,
  visitID,
  visitDate,
  visitHour,
}) => {
  const navigate = useNavigate();

  const initialRecommendation =
    localStorage.getItem("recommendation") || savedRecommendation || "";

  const [recommendation, setRecommendation] = useState(initialRecommendation);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recommendation) {
      localStorage.setItem("recommendation", recommendation);
    }
  }, [recommendation]);

  const handleInputChange = (e) => {
    setRecommendation(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (!recommendation.trim()) {
      setError("Uzupełnij zalecenie.");
      return;
    }

    console.log(visitID);

    navigate(navigateTo, {
      state: {
        recommendation,
        visitID,
        visitDate,
        visitHour,
      },
    });
  };

  useEffect(() => {
    const handleNavigate = () => {
      if (window.location.pathname !== navigateTo) {
        localStorage.removeItem("recommendation");
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
