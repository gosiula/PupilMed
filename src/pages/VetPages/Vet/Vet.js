import React, {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import VetHeader from "../../../components/VetHeader/VetHeader";
import CalendarPicker from "../../../components/CalendarPicker/CalendarPicker";
import VisitDetails from "../../../components/VisitDetails/VisitDetails";
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

  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisits();
    }, [startDate,endDate]);

  useEffect(() => {
    console.log("Date: ", startDate, " ", endDate);
    console.log("Updated visits:", visits);
  }, [visits]);
  const fetchVisits = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const startDateFormatted = formatDateForBackend(startDate);
      const endDateFormatted = formatDateForBackend(endDate);

      console.log("Token:", token);
      console.log("Token:", startDateFormatted);
      console.log("Token:", endDateFormatted);

      const resp = await fetch(`http://localhost:8080/vet/visits-by-date?startDate=${startDateFormatted}&endDate=${endDateFormatted}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        // params: {
        //   "startDate": `${startDateFormatted}`,
        //   "endDate": `${endDateFormatted}`,
        // },
      });

      if (!resp.ok) {
        throw new Error(`Failed to fetch visits: ${resp.statusText}`);
      }

      const json = await resp.json();
      console.log("JSON response:", json);

      if (!Array.isArray(json)) {
        throw new Error("Response is not an array");
      }

      setVisits(json);
    } catch (error) {
      console.error("Error fetching visits:", error);
      setError("Niepoprawne dane");
    }
  };

  const formatDateForBackend = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (update) => {
    setDateRange(update);
    fetchVisits();
  };

  const handleVisitClick = (visitID) => {
    // const formattedDate = visitDate.replaceAll("/", "-");
    // const formattedHour = visitHour.replaceAll(":", "-");

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
        {visits.map((visit, index) => (
          <VisitDetails
            key={index}
            visit={visit}
            userType={"vet"}
            onClick={() => handleVisitClick(visit.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Vet;

