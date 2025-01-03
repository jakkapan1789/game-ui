import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CardSearch() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log("Selected Date:", newDate?.format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select a Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                height: 40, // Adjust height for small size
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem", // Adjust label font size
              },
              "& .MuiInputBase-input": {
                fontSize: "0.875rem", // Adjust input font size
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default CardSearch;
