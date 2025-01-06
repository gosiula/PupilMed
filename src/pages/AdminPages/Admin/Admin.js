import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import CalendarPicker from "../../../components/CalendarPicker/CalendarPicker";
import VisitDetails from "../../../components/VisitDetails/VisitDetails";
import { admin_visits } from "../../../data/admin_visits";
import { formatDate } from "../../../utils/formatDate";
import "./Admin.css";

function Admin() {
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

    navigate(`/admin/visits/visit/${formattedDate}_${formattedHour}`, {
      state: { visitDate, visitHour },
    });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader />
      <div className="visits-content">
        <div className="calendar-and-add-button-container">
          <CalendarPicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />

          <button
            className="go-add-visit-button"
            onClick={() => navigate("/admin/visits/admin-add-visit")}
          >
            Dodaj wizytę
          </button>
        </div>

        <p className="admin-text1">
          Wizyty {startDate ? formatDate(startDate) : ""} -{" "}
          {endDate ? formatDate(endDate) : ""}
        </p>
        {admin_visits.map((visit, index) => (
          <VisitDetails
            key={index}
            visit={visit}
            userType={"admin"}
            onClick={() => handleVisitClick(visit.data, visit.godzina)}
          />
        ))}
      </div>
    </div>
  );
}

export default Admin;
