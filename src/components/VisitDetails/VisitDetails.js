import React from "react";
import { IoPaw } from "react-icons/io5";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import "./VisitDetails.css";

const VisitDetails = ({ visit, onClick, userType }) => {
  const className =
    userType === "admin"
      ? "visit-details-admin"
      : userType === "vet"
      ? "visit-details-vet"
      : "visit-details-owner";

  return (
    <div className={className} onClick={() => onClick(visit?.data)}>
      <div className="visit-header">
        <p className="visit-date">Wizyta {formatDate(visit?.date)}</p>
        <IoPaw className="visit-icon" />
      </div>
      <p className="visit-time">Godzina: {formatTime(visit?.hour)}</p>
      {userType === "admin" && (
        <div>
          <p>
            Weterynarz: {visit?.vetName} {visit?.vetSurname}
          </p>
          <p>
            Właściciel: {visit?.ownerName} {visit?.ownerSurname}
          </p>
        </div>
      )}
      {userType === "owner" && (
        <div>
          <p>Pupil: {visit?.petName}</p>
        </div>
      )}
    </div>
  );
};

export default VisitDetails;
