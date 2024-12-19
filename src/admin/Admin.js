import React, {useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import OwnerHeader from "../owner/OwnerHeader";
import {LuCalendarCheck} from "react-icons/lu";
import DatePicker from "react-datepicker";
import {IoPaw} from "react-icons/io5";
import AdminHeader from "./AdminHeader";

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
function Admin() {
    const navigate = useNavigate();

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

    const handleDateChange = (update) => {
        setDateRange(update);

        if (update[0] && update[1]) {
            setIsDatePickerOpen(false);
        }
    };

    const handleVisitClick = (visitDate) => {
        navigate("/admin-visit", { state: { visitDate } });
    };
  return (
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>

            <AdminHeader />

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

                    <button className="add-visit-button" onClick={()=>navigate('/admin-add-visit')}>
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

export default Admin;
