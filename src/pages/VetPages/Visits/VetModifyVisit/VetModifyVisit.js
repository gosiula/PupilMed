import React, {useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitForm from "../../../../components/VisitForm/VisitForm";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { visit_types } from "../../../../data/visit_types";
import { visit_info } from "../../../../data/visit_info";
import "./VetModifyVisit.css";

const VetModifyVisit = () => {
    const location = useLocation();
    const { visit } = location.state || {};

  return (
    <div className="admin-modify-visit">
      <VetHeader />
      <BackArrow title="Modyfikacja wizyty" />
      <VisitForm
        fields={[
          "date",
          "hour",
          "ownerPhoneNumber",
          "petName",
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
        navigateTo={`/vet/visits/visit/modify/confirm`}
        savedForm={visit}
        buttonText="Modyfikuj wizytę"
        type="modify"
      />
    </div>
  );
};

export default VetModifyVisit;
