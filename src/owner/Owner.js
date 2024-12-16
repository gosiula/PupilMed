import React, { useState, useMemo } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { FaDog } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Owner.css";
import "../OwnerAndVet.css";

// przykładowe wizyty
const visits = [
  {
    data: "2024-12-01",
    godzina: "14:30",
    typ_wizyty: "Konsultacja",
    adres: "ul. Główna 12, Warszawa",
    nazwa_kliniki: "Klinika Zdrowia",
  },
  {
    data: "2024-12-05",
    godzina: "10:00",
    typ_wizyty: "Szczepienie",
    adres: "ul. Leśna 3, Kraków",
    nazwa_kliniki: "Centrum Medyczne",
  },
  {
    data: "2024-12-10",
    godzina: "16:45",
    typ_wizyty: "Kontrola",
    adres: "ul. Polna 7, Gdańsk",
    nazwa_kliniki: "Przychodnia Rodzinna",
  },
];

function Owner() {
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

  const handleVisitClick = (visitDate) => {
    navigate("/ownervisit", { state: { visitDate } });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="current-button" onClick={() => navigate("/owner")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/pets")}
        >
          <FaDog className="owner-icon" />
          Zwierzęta
        </button>
        <button
            className="owner-button"
            onClick={() => navigate("/owneraccount")}
        >
          <GiMedicines className="owner-icon" />
          Zalecenia
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/owneraccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/ownerlogout")}
        >
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
        <div className="date-picker-bar" onClick={toggleDatePicker}>
          <div className="visit-header">
            <div className="date-text">
              {startDate ? startDate.toLocaleDateString() : ""} -
              {endDate ? endDate.toLocaleDateString() : ""}
            </div>
            <LuCalendarCheck className="calendar-icon" />
          </div>
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
            onClick={() => handleVisitClick(visit.data)}
          >
            <div className="visit-header">
              <p className="visit-date">Wizyta {visit.data}</p>
              <IoPaw className="visit-icon" />
            </div>
            <p className="visit-time">Godzina: {visit.godzina}</p>
            <p>Typ wizyty: {visit.typ_wizyty}</p>
            <p>
              Klinika: {visit.nazwa_kliniki}, {visit.adres}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Owner;
