import React from "react";
import "./OwnerAnimals.css";
import { admin_animals } from "../../../data/admin_animals";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import AnimalCard from "../../../components/AnimalCard/AnimalCard";

function OwnerAnimals() {
  const fieldsToDisplay = [
    "wlasciciel",
    "numer_telefonu_wlasciciela",
    "imie_zwierzecia",
    "wiek",
    "typ_zwierzecia",
    "rasa",
    "dodatkowe_informacje",
  ];

  const fieldLabels = {
    wlasciciel: "Właściciel",
    numer_telefonu_wlasciciela: "Numer telefonu właściciela",
    imie_zwierzecia: "Imię zwierzęcia",
    wiek: "Wiek",
    typ_zwierzecia: "Typ zwierzęcia",
    rasa: "Rasa",
    dodatkowe_informacje: "Dodatkowe informacje",
  };

  return (
    <div className="main-container" style={{ position: "relative" }}>
      <OwnerHeader />

      {admin_animals.map((pet, index) => (
        <AnimalCard
          userType={"owner"}
          key={index}
          pet={pet}
          fields={fieldsToDisplay}
          fieldLabels={fieldLabels}
          navigateTo={`/owner/animals/recommendation/${pet.imie_zwierzecia}`}
        />
      ))}
    </div>
  );
}

export default OwnerAnimals;
