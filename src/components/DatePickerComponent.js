import React, { useState } from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function DatePickerComponent({
  value = dayjs(), // Default value is today
  onChange,
  placeholder = "Select date",
  format = "YYYY-MM-DD",
  size = "small",
}) {
  const [selectedDate, setSelectedDate] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
    console.log("Selected Date:", newDate?.format(format));
    setIsOpen(false); // Close the calendar after a date is selected
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        // value={selectedDate}
        onChange={handleDateChange}
        open={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        format={format}
        slotProps={{
          textField: {
            size,
            placeholder,
          },
        }}
        // sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
}

DatePickerComponent.propTypes = {
  value: PropTypes.object, // Initial value as a dayjs object
  onChange: PropTypes.func, // Callback for date change
  placeholder: PropTypes.string, // Placeholder for input
  format: PropTypes.string, // Date format
  size: PropTypes.oneOf(["small", "medium", "large"]), // Input size
};

export default DatePickerComponent;
