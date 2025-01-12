import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import RecommendationsList from "../../../components/RecommendationsList/RecommendationsList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./OwnerRecommendations.css";

function OwnerRecommendations() {
  const location = useLocation();
  const navigate = useNavigate();

  const petID = location?.state?.petID;
  const petName = location?.state?.petName;

  useEffect(() => {
    if (!petName || !petID) {
      navigate("/error");
    }
  }, [petName, petID]);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;

        if (!token) {
          throw new Error("Token not found");
        }

        const resp = await fetch(
          `http://localhost:8080/owner/recommendations?petID=${petID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!resp.ok) {
          throw new Error(`Failed to fetch pets data: ${resp.statusText}`);
        }

        const json = await resp.json();

        const sortedRecommendations = json.sort(
          (a, b) => new Date(b?.visitDate) - new Date(a?.visitDate)
        );

        setRecommendations(sortedRecommendations);
      } catch (error) {
        console.error("Error fetching pets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          <RecommendationsList
            recommendations={recommendations}
            petName={petName}
          />
        </div>
      )}
    </div>
  );
}

export default OwnerRecommendations;
