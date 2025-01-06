import React from "react";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import AnimalForm from "../../../../components/AnimalForm/AnimalForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminAddAnimal.css";

const AdminAddAnimal = () => {
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

  return (
    <div className="admin-add-animal">
      <AdminHeader />
      <BackArrow title="Dodawanie zwierzęcia" />
      <AnimalForm
        fields={fields}
        fieldLabels={fieldLabels}
        fieldErrors={fieldErrors}
        savedForm={null}
        buttonText="Dodaj zwierzę"
        navigateTo={`/admin/animals/add-animal/confirm`}
      />
    </div>
  );
};

export default AdminAddAnimal;
