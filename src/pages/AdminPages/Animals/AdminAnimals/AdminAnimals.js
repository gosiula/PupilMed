import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import AnimalCard from "../../../../components/AnimalCard/AnimalCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./AdminAnimals.css";
import "../../../../App.css";

function AdminAnimals() {
  const navigate = useNavigate();

  const fieldsToDisplay = [
    "owner",
    "ownerPhoneNumber",
    "name",
    "age",
    "species",
    "breed",
    "additionalInfo",
  ];

  const fieldLabels = {
    owner: "Właściciel",
    ownerPhoneNumber: "Numer telefonu właściciela",
    name: "Imię zwierzęcia",
    age: "Wiek",
    species: "Typ zwierzęcia",
    breed: "Rasa",
    additionalInfo: "Dodatkowe informacje",
  };

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchPetName, setSearchPetName] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;

        if (!token) {
          throw new Error("Token not found");
        }

        const resp = await fetch("http://localhost:8080/admin/get-pets", {
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

        const transformedPets = json.map((pet) => {
          return {
            id: pet?.id,
            owner: `${pet?.ownerID?.name} ${pet?.ownerID?.surname}`,
            ownerPhoneNumber: pet?.ownerID?.user?.username,
            name: pet?.name,
            dateOfBirth: pet?.dateOfBirth,
            age: pet?.age,
            species: pet?.species,
            breed: pet?.breed,
            additionalInfo: pet?.additionalInfo,
          };
        });

        setPets(transformedPets);
        setFilteredPets(transformedPets); // Początkowo pokaż wszystkie zwierzęta
      } catch (error) {
        console.error("Error fetching pets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filterPets = () => {
    const filtered = pets.filter((pet) => {
      const matchesPhone = pet.ownerPhoneNumber
        .toLowerCase()
        .includes(searchPhone.toLowerCase());
      const matchesPetName = pet.name
        .toLowerCase()
        .includes(searchPetName.toLowerCase());
      return matchesPhone && matchesPetName;
    });
    setFilteredPets(filtered);
  };

  // Wywołanie filtrowania przy każdej zmianie wartości w polach wyszukiwania
  useEffect(() => {
    filterPets();
  }, [searchPhone, searchPetName, pets]);

  return (
    <div className="main-container" style={{ position: "relative" }}>
      <AdminHeader />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          <div className="animal-search-container">
            <input
              type="text"
              placeholder="Numer telefonu właściciela"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="animal-search-input"
            />
            <input
              type="text"
              placeholder="Imię zwierzęcia"
              value={searchPetName}
              onChange={(e) => setSearchPetName(e.target.value)}
              className="animal-search-input"
            />
          </div>

          {filteredPets.map((pet, index) => (
            <AnimalCard
              userType={"admin"}
              key={index}
              pet={pet}
              fields={fieldsToDisplay}
              fieldLabels={fieldLabels}
              navigateTo={`/admin/animals/animal`}
              modifyPath={`/admin/animals/modify`}
              deletePath={`/admin/animals/delete`}
            />
          ))}

          <button
            onClick={() => navigate("/admin/animals/add-animal")}
            className="add-pet-button"
          >
            Dodaj zwierzę
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminAnimals;
