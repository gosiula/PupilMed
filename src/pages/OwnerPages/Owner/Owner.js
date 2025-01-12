import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import CalendarPicker from "../../../components/CalendarPicker/CalendarPicker";
import VisitDetails from "../../../components/VisitDetails/VisitDetails";
import { formatDate } from "../../../utils/formatDate";
import { formatDateForBackend } from "../../../utils/formatDateForBackend";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../../../App.css";
import "./Owner.css";

function Owner() {
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

      const adjustedStartDate = new Date(startDate);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);

      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const startDateFormatted = formatDateForBackend(adjustedStartDate);
      const endDateFormatted = formatDateForBackend(adjustedEndDate);

      const resp = await fetch(
        `http://localhost:8080/owner/visits-by-date?startDate=${startDateFormatted}&endDate=${endDateFormatted}`,
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
        return dateA - dateB;
      });

      const transformedVisits = sortedVisits.map((visit) => ({
        visitID: visit?.id,
        date: visit?.date,
        hour: visit?.hour,
        petName: visit?.pet?.name,
      }));

      setVisits(transformedVisits);
    } catch (error) {
      console.log("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (update) => {
    setDateRange(update);
  };

  const handleVisitClick = (visitID) => {
    navigate(`/owner/visits/visit/`, {
      state: { visitID },
    });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <div className="owner-visits-content">
        <div className="owner-calendar">
          <CalendarPicker
            initialStartDate={startDate}
            initialEndDate={endDate}
            onDateChange={handleDateChange}
          />
        </div>

        <p className="owner-text1">
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
                userType={"owner"}
                onClick={() => handleVisitClick(visit?.visitID)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Owner;
