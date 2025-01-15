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

  const [initialRender, setInitialRender] = useState(true);

  const initialDateRange = useMemo(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate && storedEndDate) {
      setInitialRender(false);
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

      const adjustedStartDate = new Date(startDate);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);

      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const startDateFormatted = formatDateForBackend(adjustedStartDate);
      const endDateFormatted = formatDateForBackend(adjustedEndDate);

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

      const sortedVisits = json.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA.toDateString() === dateB.toDateString()) {
          const timeA = a.hour.split(":").map(Number);
          const timeB = b.hour.split(":").map(Number);
          return timeA[0] - timeB[0] || timeA[1] - timeB[1];
        }

        return dateA - dateB;
      });

      setVisits(sortedVisits);
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (update) => {
    setInitialRender(false);
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
            initialStartDate={
              initialDateRange && initialRender
                ? new Date(startDate.getTime() + 86400000) // dodanie 1 dnia w milisekundach
                : startDate
            }
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

        {loading ? (
          <div className="spinner">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>
        ) : (
          <div>
            <p className="vet-text1">
              Wizyty{" "}
              {initialDateRange && initialRender
                ? startDate
                  ? formatDate(
                      new Date(
                        new Date(startDate).setDate(startDate.getDate() + 1)
                      )
                    )
                  : ""
                : startDate
                ? formatDate(startDate)
                : ""}
              - {endDate ? formatDate(endDate) : ""}
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
        )}
      </div>
    </div>
  );
}

export default Vet;
