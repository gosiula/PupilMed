import React from "react";
import { useNavigate } from "react-router-dom";
import "./Recommendation.css";

const Recommendation = ({
  recommendation_info,
  visitDate,
  visitHour,
  formData,
  visitID,
  addPath,
  modifyPath,
  deletePath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="visit-info3">
      <p className="visit-date-info2">Zalecenia:</p>
      {recommendation_info != null ? (
        <>
          <p>{recommendation_info}</p>
          <div className="button-container2">
            <button
              className="recommendation-button"
              onClick={() =>
                navigate(modifyPath, {
                  state: {
                    visitDate,
                    visitHour,
                    formData,
                    visitID,
                    recommendation_info,
                  },
                })
              }
            >
              Modyfikuj zalecenie
            </button>
            <button
              className="recommendation-button"
              onClick={() =>
                navigate(deletePath, {
                  state: { visitDate, visitHour, visitID },
                })
              }
            >
              Usuń zalecenie
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Brak dodanych zaleceń.</p>
          <div className="button-container2">
            <button
              className="recommendation-button"
              onClick={() =>
                navigate(addPath, {
                  state: { visitDate, visitHour, visitID },
                })
              }
            >
              Dodaj zalecenie
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Recommendation;
