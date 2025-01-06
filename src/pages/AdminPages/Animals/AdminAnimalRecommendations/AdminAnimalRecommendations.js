import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import RecommendationsList from "../../../../components/RecommendationsList/RecommendationsList";
import { recommendations } from "../../../../data/recommendations";
import "./AdminAnimalRecommendations.css";

function AdminAnimalRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pet } = location.state || {};

  const { animalInfo } = useParams();

  const animalName = animalInfo ? animalInfo.split("_")[1] : "";

  useEffect(() => {
    if (!pet) {
      navigate("/error");
    }
  }, [pet, navigate]);

  if (!pet) return null;

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader />
      <RecommendationsList
        recommendations={recommendations}
        petName={animalName}
      />
    </div>
  );
}

export default AdminAnimalRecommendations;
