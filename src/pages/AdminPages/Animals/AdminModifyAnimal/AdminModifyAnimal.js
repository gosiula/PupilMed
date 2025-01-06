import React from "react";
import { useParams } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import AnimalForm from "../../../../components/AnimalForm/AnimalForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { animal_data } from "../../../../data/animal_data";
import "./AdminModifyAnimal.css";
console.log(localStorage);
const AdminModifyAnimal = () => {
  const fields = [
    "numer_telefonu_wlasciciela",
    "imie_zwierzecia",
    "data_urodzenia",
    "typ_zwierzecia",
    "rasa",
    "dodatkowe_informacje",
  ];

  const fieldLabels = {
    numer_telefonu_wlasciciela: "Numer telefonu właściciela",
    imie_zwierzecia: "Imię zwierzęcia",
    data_urodzenia: "Data urodzenia zwierzęcia",
    typ_zwierzecia: "Gatunek zwierzęcia",
    rasa: "Rasa zwierzęcia",
    dodatkowe_informacje: "Dodatkowe informacje",
  };

  const fieldErrors = {
    numer_telefonu_wlasciciela: "numer telefonu właściciela",
    imie_zwierzecia: "imię zwierzęcia",
    data_urodzenia: "datę urodzenia zwierzęcia",
    rasa: "rasę zwierzaka",
    typ_zwierzecia: "gatunek zwierzęcia",
    dodatkowe_informacje: "dodatkowe informacje",
  };

  const { animalInfo } = useParams();

  const [phoneNumber, animalName] = animalInfo
    ? animalInfo.split("_")
    : ["", ""];

  return (
    <div className="admin-add-animal">
      <AdminHeader />
      <BackArrow title="Modyfikacja zwierzęcia" />
      <AnimalForm
        fields={fields}
        fieldLabels={fieldLabels}
        fieldErrors={fieldErrors}
        savedForm={animal_data}
        buttonText="Modyfikuj zwierzę"
        navigateTo={`/admin/animals/modify/confirm/${phoneNumber}_${animalName}`}
      />
    </div>
  );
};

export default AdminModifyAnimal;
