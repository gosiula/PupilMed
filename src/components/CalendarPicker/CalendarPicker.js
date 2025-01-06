import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarPicker.css";
import { LuCalendarCheck } from "react-icons/lu";
import { formatDate } from "../../utils/formatDate";

const CalendarPicker = ({ startDate, endDate, onDateChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => setIsDatePickerOpen((prev) => !prev);

  const handleDateSelection = (dates) => {
    onDateChange(dates);
    if (dates[0] && dates[1]) {
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div>
      <div className="date-picker-bar" onClick={toggleDatePicker}>
        <div className="visit-header">
          <div className="date-text">
            {startDate ? formatDate(startDate) : ""} -{" "}
            {endDate ? formatDate(endDate) : ""}
          </div>
          <LuCalendarCheck className="calendar-icon" />
        </div>
      </div>
      {isDatePickerOpen && (
        <div className="date-picker-container">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
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
