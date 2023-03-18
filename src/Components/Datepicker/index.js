import { useState, useEffect, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

const DatePickerInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <div className="datepickerCustomInput" onClick={onClick} ref={ref}>
      <div className="dateInput"></div>
      {value ? (
        <div className="date">{value}</div>
      ) : (
        <div className="dateInput">Select</div>
      )}
    </div>
  );
});

const DatePicker = ({
  id,
  value = new Date(),
  onDateSelect,
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const isValidDate = new Date(value).toString() !== "Invalid Date";
    setSelectedDate(isValidDate ? new Date(value) : undefined);
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date, id);
  };

  return (
    <ReactDatePicker
      id={id}
      selected={selectedDate}
      showIcon
      onChange={(date) => handleDateChange(date)}
      customInput={<DatePickerInput />}
      minDate={minDate}
      maxDate={maxDate}
      peekNextMonth={false}
      dateFormat="dd/MM/yyyy"
      showTimeSelect={false}
      // isClearable
      clearButtonTitle="clear"
    />
  );
};

export default DatePicker;
