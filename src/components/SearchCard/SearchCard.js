import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Popover,
  IconButton,
  Grid,
  InputAdornment,
  Stack,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import DatePickerComponent from "../DatePickerComponent";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WeekFilter from "../WeekFilter";

const SearchCard = () => {
  const [keyword, setKeyword] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [anchorElFrom, setAnchorElFrom] = useState(null);
  const [anchorElTo, setAnchorElTo] = useState(null);

  const handlePopoverOpenFrom = (event) => {
    setAnchorElFrom(event.currentTarget);
  };

  const handlePopoverCloseFrom = () => {
    setAnchorElFrom(null);
  };

  const handlePopoverOpenTo = (event) => {
    setAnchorElTo(event.currentTarget);
  };

  const handlePopoverCloseTo = () => {
    setAnchorElTo(null);
  };

  const handleWeekChange = (startDate, finishDate) => {
    console.log("start", startDate);
    console.log("finish", finishDate);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={6}>
            <TextField
              fullWidth
              placeholder="Search for project or task...."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="inherit" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={8} xs={6}>
            <Stack
              direction={"row"}
              spacing={1}
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Typography>Work Period :</Typography>
              <WeekFilter onWeekChange={handleWeekChange} />
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  backgroundImage:
                    "linear-gradient(to right, #6C48C5, #4335A7)",
                }}
                startIcon={<ClearIcon />}
              >
                Clear Filter
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default SearchCard;
