import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAnimals.css";
import { admin_animals } from "../../../../data/admin_animals";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import AnimalCard from "../../../../components/AnimalCard/AnimalCard";

function AdminAnimals() {
  const navigate = useNavigate();

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
      <AdminHeader />

      {admin_animals.map((pet, index) => (
        <AnimalCard
          userType={"admin"}
          key={index}
          pet={pet}
          fields={fieldsToDisplay}
          fieldLabels={fieldLabels}
          navigateTo={`/admin/animals/animal/${pet.numer_telefonu_wlasciciela}_${pet.imie_zwierzecia}`}
          modifyPath={`/admin/animals/modify/${pet.numer_telefonu_wlasciciela}_${pet.imie_zwierzecia}`}
          deletePath={`/admin/animals/delete/${pet.numer_telefonu_wlasciciela}_${pet.imie_zwierzecia}`}
        />
      ))}

      <button
        onClick={() => navigate("/admin/animals/add-animal")}
        className="add-pet-button"
      >
        Dodaj zwierzę
      </button>
    </div>
  );
}

export default AdminAnimals;
