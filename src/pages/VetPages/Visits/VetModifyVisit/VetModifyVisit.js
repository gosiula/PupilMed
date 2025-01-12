import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import VisitForm from "../../../../components/VisitForm/VisitForm";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./VetModifyVisit.css";
import "../../../../App.css";

const VetModifyVisit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location?.state?.formData;
  const visitID = location?.state?.visitID;

  useEffect(() => {
    if (!visitID || !formData) {
      navigate("/error");
    }
  }, [visitID, formData]);

  const [visitTypes, setVisitTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisit();
  }, []);

  const fetchVisit = async () => {
    try {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const resp = await fetch(`http://localhost:8080/vet/get-visit-types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        const errorDetails = await resp.text();
        throw new Error(
          `Nie udało się pobrać wizyt: ${resp.status} - ${errorDetails}`
        );
      }

      const json = await resp.json();

      const formattedVisitTypes = json.reduce((acc, item) => {
        acc[item.visitType] = item.price;
        return acc;
      }, {});

      setVisitTypes(formattedVisitTypes);
    } catch (error) {
      console.error("Nie udało się pobrać wizyt:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modify-visit">
      <VetHeader />
      <BackArrow title="Modyfikacja wizyty" />
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
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
            visitTypes={visitTypes}
            navigateTo={`/vet/visits/visit/modify/confirm`}
            savedForm={formData}
            visitID={visitID}
            buttonText="Modyfikuj wizytę"
            type="modify"
          />
        </div>
      )}
    </div>
  );
};

export default VetModifyVisit;
