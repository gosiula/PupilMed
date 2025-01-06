import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import CalendarPicker from "../../../components/CalendarPicker/CalendarPicker";
import VisitDetails from "../../../components/VisitDetails/VisitDetails";
import { owner_visits } from "../../../data/owner_visits";
import { formatDate } from "../../../utils/formatDate";
import "./Owner.css";

function Owner() {
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

    navigate(`/owner/visits/visit/${formattedDate}_${formattedHour}`, {
      state: { visitDate, visitHour },
    });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <div className="owner-visits-content">
        <div className="owner-calendar">
          <CalendarPicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
        </div>

        <p className="owner-text1">
          Wizyty {startDate ? formatDate(startDate) : ""} -{" "}
          {endDate ? formatDate(endDate) : ""}
        </p>
        {owner_visits.map((visit, index) => (
          <VisitDetails
            key={index}
            visit={visit}
            userType={"owner"}
            onClick={() => handleVisitClick(visit.data, visit.godzina)}
          />
        ))}
      </div>
    </div>
  );
}

export default Owner;
