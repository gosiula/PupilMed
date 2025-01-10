import React from "react";
import { useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitForm from "../../../../components/VisitForm/VisitForm";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { visit_types } from "../../../../data/visit_types";
import "./VetModifyVisit.css";

const VetModifyVisit = () => {
  const location = useLocation();
  const { formData, visitID } = location?.state;

  return (
    <div className="admin-modify-visit">
      <VetHeader />
      <BackArrow title="Modyfikacja wizyty" />
      <VisitForm
        fields={["date", "hour", "ownerPhoneNumber", "petName"]}
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
        navigateTo={`/vet/visits/visit/modify/confirm`}
        savedForm={formData}
        visitID={visitID}
        buttonText="Modyfikuj wizytę"
        type="modify"
      />
    </div>
  );
};

export default VetModifyVisit;
