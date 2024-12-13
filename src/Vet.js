import React, { useState, useMemo } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./OwnerAndVet.css";
import "./Vet.css";

// przykładowe wizyty
const visits = [
  {
    data: "01.12.2024",
    godzina: "14:30",
  },
  {
    data: "05.12.2024",
    godzina: "10:00",
  },
  {
    data: "10.12.2024",
    godzina: "16:45",
  },
];

function Vet() {
  const navigate = useNavigate();

  // podanie daty początkowej jako dzisiaj oraz obliczenie daty za miesiąc od dzisiaj jako daty końcowej
  const initialDateRange = useMemo(() => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 30);
    return [today, endDate];
  }, []);

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [startDate, endDate] = dateRange;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => setIsDatePickerOpen((prevState) => !prevState);

  // funkcja do ustawiania zakresu dat i zamknięcia kalendarza
  const handleDateChange = (update) => {
    setDateRange(update);

    // zamknij kalendarz, jeśli wybrano obie daty
    if (update[0] && update[1]) {
      setIsDatePickerOpen(false);
    }
  };

  const handleVisitClick = (visitDate, visitHour) => {
    navigate("/vetvisit", { state: { visitDate, visitHour } });
  };

  const handleAddVisit = (visitDate) => {
    navigate("/vetaddvisit");
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="current-button" onClick={() => navigate("/vet")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/vetaccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button className="owner-button" onClick={() => navigate("/vetlogout")}>
          <MdLogout className="owner-icon" />
          Wyloguj
        </button>
        <div className="logo-container">
          <p className="logo-text">PupilMed</p>
          <div className="heart-with-paw">
            <GoHeartFill className="heart-icon" />
            <IoPaw className="paw-icon" />
          </div>
        </div>
      </div>

      <div className="visits-content">
        <div className="calendar-and-add-button-container">
          <div className="date-picker-bar" onClick={toggleDatePicker}>
            <div className="visit-header">
              <div className="date-text">
                {startDate ? startDate.toLocaleDateString() : ""} -
                {endDate ? endDate.toLocaleDateString() : ""}
              </div>
              <LuCalendarCheck className="calendar-icon" />
            </div>
          </div>

          <button className="add-visit-button" onClick={handleAddVisit}>
            Dodaj wizytę
          </button>
        </div>

        {isDatePickerOpen && (
          <div className="date-picker-container">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              inline
              dateFormat="yyyy-MM-dd"
            />
          </div>
        )}

        <p className="text1">
          Wizyty {startDate ? startDate.toLocaleDateString() : ""} -{" "}
          {endDate ? endDate.toLocaleDateString() : ""}
        </p>
        {visits.map((visit, index) => (
          <div
            key={index}
            className="visit-details"
            onClick={() => handleVisitClick(visit.data, visit.godzina)}
          >
            <div className="visit-header">
              <div>
                <p className="visit-date">Wizyta {visit.data}</p>
                <p className="visit-time">Godzina: {visit.godzina}</p>
              </div>
              <IoPaw className="visit-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vet;
