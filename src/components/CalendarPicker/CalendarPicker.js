import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarPicker.css";
import { LuCalendarCheck } from "react-icons/lu";
import { formatDate } from "../../utils/formatDate";

const CalendarPicker = ({ initialStartDate, initialEndDate, onDateChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dates, setDates] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");
    setDates({
      startDate: storedStartDate ? new Date(storedStartDate) : initialStartDate,
      endDate: storedEndDate ? new Date(storedEndDate) : initialEndDate,
    });
  }, [initialStartDate, initialEndDate]);

  const toggleDatePicker = () => setIsDatePickerOpen((prev) => !prev);

  const handleDateSelection = (selectedDates) => {
    const [startDate, endDate] = selectedDates;

    setDates({ startDate, endDate });
    localStorage.setItem("startDate", startDate ? startDate.toISOString() : "");
    localStorage.setItem("endDate", endDate ? endDate.toISOString() : "");

    onDateChange(selectedDates);

    if (startDate && endDate) {
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div>
      <div className="date-picker-bar" onClick={toggleDatePicker}>
        <div className="visit-header">
          <div className="date-text">
            {dates.startDate ? formatDate(dates.startDate) : ""} -{" "}
            {dates.endDate ? formatDate(dates.endDate) : ""}
          </div>
          <LuCalendarCheck className="calendar-icon" />
        </div>
      </div>
      {isDatePickerOpen && (
        <div className="date-picker-container">
          <DatePicker
            selectsRange
            startDate={dates.startDate}
            endDate={dates.endDate}
            onChange={handleDateSelection}
            inline
            dateFormat="yyyy-MM-dd"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
