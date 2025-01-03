import { useState } from "react";
import { addWeeks, startOfWeek, endOfWeek, format } from "date-fns";
import { Button, IconButton, Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const WeekFilter = ({ onWeekChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleWeekChange = (weeks) => {
    const newDate = addWeeks(currentDate, weeks);
    setCurrentDate(newDate);

    const start = startOfWeek(newDate, { weekStartsOn: 1 }); // Start from Monday
    const end = endOfWeek(newDate, { weekStartsOn: 1 });

    onWeekChange(start, end);
  };

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const dateRange = `${format(weekStart, "MMM d")} - ${format(
    weekEnd,
    "MMM d, yyyy"
  )}`;

  return (
    // <Box display="flex" alignItems="center">
    //   <IconButton
    //     color="primary"
    //     onClick={() => handleWeekChange(-1)}
    //     size="small"
    //     sx={{ border: "0.5px solid gray", borderRadius: 2, color: "gray" }}
    //   >
    //     <ChevronLeftIcon fontSize="small" />
    //   </IconButton>

    //   <Typography variant="body2" textAlign="center" minWidth="150px">
    //     {dateRange}
    //   </Typography>

    //   <IconButton
    //     color="primary"
    //     onClick={() => handleWeekChange(1)}
    //     size="small"
    //     sx={{ border: "0.5px solid gray", borderRadius: 2, color: "gray" }}
    //   >
    //     <ChevronRightIcon fontSize="small" />
    //   </IconButton>
    // </Box>
    <Box
      display="flex"
      alignItems="center"
      sx={{ border: "0.5px solid gray", borderRadius: 2 }}
    >
      <IconButton
        color="primary"
        onClick={() => handleWeekChange(-1)}
        size="small"
        sx={{ color: "gray" }}
        //   sx={{ border: "0.5px solid gray", borderRadius: 2, color: "gray" }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      <Typography variant="body2" textAlign="center" minWidth="150px">
        {dateRange}
      </Typography>

      <IconButton
        color="primary"
        onClick={() => handleWeekChange(1)}
        size="small"
        sx={{ color: "gray" }}
        //   sx={{ border: "0.5px solid gray", borderRadius: 2, color: "gray" }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default WeekFilter;
