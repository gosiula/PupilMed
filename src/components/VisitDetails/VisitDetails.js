import React from "react";
import { IoPaw } from "react-icons/io5";
import "./VisitDetails.css";

const VisitDetails = ({ visit, onClick, userType }) => {
  const className =
    userType === "admin"
      ? "visit-details-admin"
      : userType === "vet"
      ? "visit-details-vet"
      : "visit-details-owner";

  return (
    <div className={className} onClick={() => onClick(visit.data)}>
      <div className="visit-header">
        <p className="visit-date">Wizyta {visit.date}</p>
        <IoPaw className="visit-icon" />
      </div>
      <p className="visit-time">Godzina: {visit.hour}</p>
      {userType === "admin" && (
        <div>
          <p>Weterynarz: {visit.weterynarz}</p>
          <p>
            Klinika: {visit.nazwa_kliniki}, {visit.address}
          </p>
        </div>
      )}
      {userType === "owner" && (
        <div>
          <p>Pupil: {visit.typ_zwierzecia} {visit.imie_zwierzecia}</p>
        </div>
      )}
    </div>
  );
};

export default VisitDetails;
