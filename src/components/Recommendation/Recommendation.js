import React from "react";
import { useNavigate } from "react-router-dom";
import "./Recommendation.css";

const Recommendation = ({
  recommendation_info,
  formData,
  visitID,
  visitHour,
  visitDate,
  addPath,
  modifyPath,
  deletePath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="visit-info3">
      <p className="visit-date-info2">Zalecenie:</p>
      {recommendation_info != null ? (
        <>
          <p>{recommendation_info}</p>
          <div className="button-container2">
            <button
              className="recommendation-button"
              onClick={() =>
                navigate(modifyPath, {
                  state: {
                    formData,
                    visitID,
                    recommendation_info,
                    visitDate,
                    visitHour,
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
                  state: { visitID, visitDate, visitHour },
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
                  state: { visitID, visitDate, visitHour },
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
