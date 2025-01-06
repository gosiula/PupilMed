import React from "react";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitForm from "../../../../components/VisitForm/VisitForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { visit_types } from "../../../../data/visit_types";
import "./AdminAddVisit.css";

const AdminAddVisit = () => {
  return (
    <div>
      <AdminHeader />
      <BackArrow title="Dodawanie wizyty" />
      <VisitForm
        fields={[
          "data",
          "godzina",
          "numer_telefonu_weterynarza",
          "numer_telefonu_wlasciciela",
          "imie_zwierzecia",
        ]}
        fieldLabels={{
          data: "Data wizyty",
          godzina: "Godzina wizyty",
          numer_telefonu_weterynarza: "Numer telefonu weterynarza",
          numer_telefonu_wlasciciela: "Numer telefonu właściciela",
          imie_zwierzecia: "Imię zwierzęcia",
        }}
        fieldErrors={{
          data: "datę wizyty",
          godzina: "godzinę wizyty",
          numer_telefonu_weterynarza: "numer telefonu weterynarza",
          numer_telefonu_wlasciciela: "numer telefonu właściciela",
          imie_zwierzecia: "imię zwierzęcia",
        }}
        visitTypes={visit_types}
        navigateTo="/admin/visits//confirm"
        savedForm={null}
        buttonText="Dodaj wizytę"
        type="add"
      />
    </div>
  );
};

export default AdminAddVisit;
