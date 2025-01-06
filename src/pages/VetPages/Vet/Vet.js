import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import VetHeader from "../../../components/VetHeader/VetHeader";
import CalendarPicker from "../../../components/CalendarPicker/CalendarPicker";
import VisitDetails from "../../../components/VisitDetails/VisitDetails";
import { admin_visits } from "../../../data/admin_visits";
import { formatDate } from "../../../utils/formatDate";
import "./Vet.css";

function Vet() {
  const navigate = useNavigate();

  const initialDateRange = useMemo(() => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);
    return [today, endDate];
  }, []);

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update) => {
    setDateRange(update);
  };

  const handleVisitClick = (visitDate, visitHour) => {
    const formattedDate = visitDate.replaceAll("/", "-");
    const formattedHour = visitHour.replaceAll(":", "-");

    navigate(`/vet/visits/visit/${formattedDate}_${formattedHour}`, {
      state: { visitDate, visitHour },
    });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <div className="vet-visits-content">
        <div className="vet-calendar-and-add-button-container">
          <CalendarPicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />

          <button
            className="vet-go-add-visit-button"
            onClick={() => navigate("/vet/visits/vet-add-visit")}
          >
            Dodaj wizytę
          </button>
        </div>

        <p className="vet-text1">
          Wizyty {startDate ? formatDate(startDate) : ""} -{" "}
          {endDate ? formatDate(endDate) : ""}
        </p>
        {admin_visits.map((visit, index) => (
          <VisitDetails
            key={index}
            visit={visit}
            userType={"vet"}
            onClick={() => handleVisitClick(visit.data, visit.godzina)}
          />
        ))}
      </div>
    </div>
  );
}

export default Vet;
