import React from "react";
import { GiMedicines } from "react-icons/gi";
import BackArrow from "../BackArrow/BackArrow";
import "./RecommendationsList.css";

function RecommendationsList({ recommendations, petName }) {
  return (
    <div>
      <BackArrow title={`Zalecenia dla zwierzaka ${petName}`} />
      {recommendations
        .filter(
          (recommendation) =>
            recommendation && recommendation.recommendation?.trim()
        )
        .map((recommendation, index) => (
          <div key={index} className="recommendation-item">
            <div className="recommendation-details">
              <div className="visit-header">
                <p className="visit-date">
                  Zalecenie {recommendation?.visitDate}
                </p>
                <GiMedicines className="recommendation-icon" />
              </div>
              <p>Informacje od weterynarza:</p>
              <p>{recommendation?.recommendation}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RecommendationsList;
