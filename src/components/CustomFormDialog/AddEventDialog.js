import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  Select,
  MenuItem,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DatePickerComponent from "../DatePickerComponent";

const AddEventDialog = ({ open, onClose }) => {
  const [detail, setDetail] = useState();
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //   backdropFilter: "blur(1px)",
        },
      }}
      PaperProps={{
        sx: {
          p: 1,
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        },
      }}
    >
      <DialogContent sx={{ position: "relative" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1">New Event</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Box component={Stack} spacing={1}>
          <Divider
            sx={{
              mt: -1,
              mb: 1,
              height: "2px",
              border: "none",
              backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
            }}
          />

          <Stack direction={"row"} spacing={1}>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Typography variant="body1" fontWeight="medium">
                Status
              </Typography>
              <Select
                size="small"
                defaultValue=""
                displayEmpty
                sx={{
                  "& .MuiSelect-outlined": {
                    padding: "10px 12px",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select status
                </MenuItem>
                <MenuItem value={10}>Pending</MenuItem>
                <MenuItem value={20}>Completed</MenuItem>
                <MenuItem value={30}>Cancel</MenuItem>
                <MenuItem value={40}>Reopened</MenuItem>
                <MenuItem value={50}>Hold</MenuItem>
              </Select>
            </Stack>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Typography variant="body1" fontWeight="medium">
                Event Type
              </Typography>
              <Select
                size="small"
                defaultValue=""
                displayEmpty
                sx={{
                  "& .MuiSelect-outlined": {
                    padding: "10px 12px",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select event type
                </MenuItem>
                <MenuItem value={10}>Meeting</MenuItem>
                <MenuItem value={20}>Inform</MenuItem>
                <MenuItem value={30}>Progress</MenuItem>
                <MenuItem value={40}>Develop</MenuItem>
                <MenuItem value={50}>Implement</MenuItem>
                {/* <MenuItem value={50}>Bug fixes</MenuItem> */}
              </Select>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Typography variant="body1" fontWeight="medium">
                Date
              </Typography>
              <DatePickerComponent />
            </Stack>
            <Stack spacing={1} sx={{ width: "100%" }}></Stack>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body1" fontWeight="medium">
              Detail
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              multiline
              minRows={4}
              maxRows={6}
              inputProps={{ maxLength: 500 }}
              placeholder="Enter details here..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: 1.5,
                },
              }}
            />
            <Typography
              variant="body1"
              fontWeight="medium"
              sx={{ color: "#616161", alignSelf: "flex-end", mt: 1 }}
            >
              {detail ? detail.length : 0}/500
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ mt: 1 }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            size="small"
            sx={{
              px: 3,
              textTransform: "none",
              borderColor: "#1e3a8a",
              color: "#1e3a8a",
              "&:hover": {
                backgroundColor: "#e0e7ff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
              px: 3,
              textTransform: "none",
              color: "#fff",
              backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #1d4ed8, #2563eb)",
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
