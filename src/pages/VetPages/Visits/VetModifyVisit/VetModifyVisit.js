import React from "react";
import { useLocation, useParams } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitForm from "../../../../components/VisitForm/VisitForm";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { visit_types } from "../../../../data/visit_types";
import { visit_info } from "../../../../data/visit_info";
import "./VetModifyVisit.css";

const VetModifyVisit = () => {
  const location = useLocation();
  const { visitDateAndHour } = useParams();

  const [visitDate, visitHour] = visitDateAndHour
    ? visitDateAndHour.split("_")
    : ["", ""];

  const { visitDate: stateVisitDate, visitHour: stateVisitHour } =
    location.state || {};

  const finalVisitDate = stateVisitDate || visitDate || "";
  const finalVisitHour =
    stateVisitHour.replace(":", "-") || "" || visitHour.replace(":", "-") || "";

  return (
    <div className="admin-modify-visit">
      <VetHeader />
      <BackArrow title="Modyfikacja wizyty" />
      <VisitForm
        fields={[
          "data",
          "godzina",
          "numer_telefonu_wlasciciela",
          "imie_zwierzecia",
        ]}
        fieldLabels={{
          data: "Data wizyty",
          godzina: "Godzina wizyty",
          numer_telefonu_wlasciciela: "Numer telefonu właściciela",
          imie_zwierzecia: "Imię zwierzęcia",
        }}
        fieldErrors={{
          data: "datę wizyty",
          godzina: "godzinę wizyty",
          numer_telefonu_wlasciciela: "numer telefonu właściciela",
          imie_zwierzecia: "imię zwierzęcia",
        }}
        visitTypes={visit_types}
        navigateTo={`/vet/visits/visit/modify/confirm/${finalVisitDate}_${finalVisitHour}`}
        savedForm={visit_info}
        buttonText="Modyfikuj wizytę"
        type="modify"
      />
    </div>
  );
};

export default VetModifyVisit;
