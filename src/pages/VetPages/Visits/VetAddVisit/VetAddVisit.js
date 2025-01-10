import React from "react";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitForm from "../../../../components/VisitForm/VisitForm";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { visit_types } from "../../../../data/visit_types";
import "./VetAddVisit.css";

const VetAddVisit = () => {
  return (
    <div>
      <VetHeader />
      <BackArrow title="Dodawanie wizyty" />
      <VisitForm
        fields={[
          "date",
          "hour",
          "ownerPhoneNumber",
          "petName",
        ]}
        fieldLabels={{
          date: "Data wizyty",
          hour: "Godzina wizyty",
          ownerPhoneNumber: "Numer telefonu właściciela",
          petName: "Imię zwierzęcia",
        }}
        fieldErrors={{
          date: "datę wizyty",
          hour: "godzinę wizyty",
          ownerPhoneNumber: "numer telefonu właściciela",
          petName: "imię zwierzęcia",
        }}
        visitTypes={visit_types}
        navigateTo="/vet/visits/vet-add-visit/confirm"
        savedForm={null}
        visitID={null}
        buttonText="Dodaj wizytę"
        type="add"
      />
    </div>
  );
};

export default VetAddVisit;
