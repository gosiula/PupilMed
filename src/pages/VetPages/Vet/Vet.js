import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import VetHeader from "../../../components/VetHeader/VetHeader";
import CalendarPicker from "../../../components/CalendarPicker/CalendarPicker";
import VisitDetails from "../../../components/VisitDetails/VisitDetails";
import { formatDate } from "../../../utils/formatDate";
import { formatDateForBackend } from "../../../utils/formatDateForBackend";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Vet.css";
import "../../../App.css";

function Vet() {
  const navigate = useNavigate();

  const initialDateRange = useMemo(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate && storedEndDate) {
      return [new Date(storedStartDate), new Date(storedEndDate)];
    }

    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);
    return [today, endDate];
  }, []);

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [startDate, endDate] = dateRange;

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisits();
  }, [startDate, endDate]);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const startDateFormatted = formatDateForBackend(startDate);
      const endDateFormatted = formatDateForBackend(endDate);

      const resp = await fetch(
        `http://localhost:8080/vet/visits-by-date?startDate=${startDateFormatted}&endDate=${endDateFormatted}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!resp.ok) {
        throw new Error(`Failed to fetch visits: ${resp.statusText}`);
      }

      const json = await resp.json();

      if (!Array.isArray(json)) {
        throw new Error("Response is not an array");
      }

      setVisits(json);
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (update) => {
    setDateRange(update);
    fetchVisits();
  };

  const handleVisitClick = (visitID) => {
    navigate(`/vet/visits/visit`, {
      state: { visitID },
    });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <div className="vet-visits-content">
        <div className="vet-calendar-and-add-button-container">
          <CalendarPicker
            initialStartDate={startDate}
            initialEndDate={endDate}
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
        {loading ? (
          <div className="spinner">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>
        ) : (
          <div>
            {visits.map((visit, index) => (
              <VisitDetails
                key={index}
                visit={visit}
                userType={"vet"}
                onClick={() => handleVisitClick(visit.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Vet;
