import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
const Calendar = ({ selectedDate, onDateChange, disabled }) => {
  const isMonday = (date) => date.getDay() === 1;

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return (
    <div className={`calendar-container ${disabled ? "disabled" : ""}`}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => !disabled && onDateChange(date)}
        filterDate={(date) => !isMonday(date)}
        inline
        minDate={firstDayOfMonth}
        maxDate={lastDayOfMonth}
        showMonthDropdown={false}
        showYearDropdown={false}
        dropdownMode="select"
      />
    </div>
  );
};

export default Calendar;
