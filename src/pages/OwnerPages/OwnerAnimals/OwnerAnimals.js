import React, { useState, useEffect } from "react";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import AnimalCard from "../../../components/AnimalCard/AnimalCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./OwnerAnimals.css";
import "../../../App";

function OwnerAnimals() {
  const fieldsToDisplay = ["name", "age", "species", "breed", "additionalInfo"];

  const fieldLabels = {
    name: "Imię zwierzęcia",
    age: "Wiek",
    species: "Typ zwierzęcia",
    breed: "Rasa",
    additionalInfo: "Dodatkowe informacje",
  };

  const [pets, setPets] = useState([]);
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

        const resp = await fetch("http://localhost:8080/owner/pets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) {
          throw new Error(`Failed to fetch pets data: ${resp.statusText}`);
        }

        const json = await resp.json();

        setPets(json);
      } catch (error) {
        console.error("Error fetching pets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  return (
    <div className="main-container" style={{ position: "relative" }}>
      <OwnerHeader />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          {pets.map((pet, index) => (
            <AnimalCard
              userType={"owner"}
              key={index}
              pet={pet}
              fields={fieldsToDisplay}
              fieldLabels={fieldLabels}
              navigateTo={`/owner/animals/recommendation`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerAnimals;
