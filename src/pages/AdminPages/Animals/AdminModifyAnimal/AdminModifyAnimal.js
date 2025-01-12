import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import AnimalForm from "../../../../components/AnimalForm/AnimalForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./AdminModifyAnimal.css";
import "../../../../App.css";

const AdminModifyAnimal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location?.state?.formData;
  const petID = location?.state?.petID;

  useEffect(() => {
    if (!petID || !formData) {
      navigate("/error");
    }
  }, [petID, formData]);

  const fields = [
    "ownerPhoneNumber",
    "petName",
    "petDob",
    "petSpecies",
    "petBreed",
    "additionalInfo",
  ];

  const fieldLabels = {
    ownerPhoneNumber: "Numer telefonu właściciela",
    petName: "Imię zwierzęcia",
    petDob: "Data urodzenia zwierzęcia",
    petSpecies: "Gatunek zwierzęcia",
    petBreed: "Rasa zwierzęcia",
    additionalInfo: "Dodatkowe informacje",
  };

  const fieldErrors = {
    ownerPhoneNumber: "numer telefonu właściciela",
    petName: "imię zwierzęcia",
    petDob: "datę urodzenia zwierzęcia",
    petBreed: "rasę zwierzaka",
    petSpecies: "gatunek zwierzęcia",
    additionalInfo: "dodatkowe informacje",
  };

  useEffect(() => {
    fetchVisit();
  }, []);

  const [animalTypes, setAnimalTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchVisit = async () => {
    try {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const resp = await fetch(
        `http://localhost:8080/admin/get-species-breed`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!resp.ok) {
        const errorDetails = await resp.text();
        throw new Error(
          `Nie udało się pobrać wizyt: ${resp.status} - ${errorDetails}`
        );
      }

      const json = await resp.json();

      setAnimalTypes(json);
    } catch (error) {
      console.error("Nie udało się pobrać wizyt:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-animal">
      <AdminHeader />
      <BackArrow title="Modyfikacja zwierzęcia" />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          <AnimalForm
            petID={petID}
            fields={fields}
            fieldLabels={fieldLabels}
            fieldErrors={fieldErrors}
            savedForm={formData}
            animalData={animalTypes}
            buttonText="Modyfikuj zwierzę"
            navigateTo={`/admin/animals/modify/confirm`}
          />
        </div>
      )}
    </div>
  );
};

export default AdminModifyAnimal;
