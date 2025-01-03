import React, { useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Typography,
  Card,
  useTheme,
  Stack,
  Chip,
  Divider,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Zoom,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DatePickerComponent from "@/components/DatePickerComponent";
import useDialog from "./CustomDialog/useDialog";
import AddEventDialog from "./CustomFormDialog/AddEventDialog";
import PriorityChip from "./CustomChip/PriorityChip";
import StatusChip from "./CustomChip/StatusChip";

export function TimelineCard({ item, index }) {
  const [showDialog, DialogComponent] = useDialog();
  const theme = useTheme();

  const statusColors = {
    Pending: { bgColor: "#FFF8E1", lbColor: "#FF852C" },
    Completed: { bgColor: "#E8F0FF", lbColor: "#1877F2" },
    Cancel: { bgColor: "#FFD3D3", lbColor: "#E1251B" },
    Hold: { bgColor: "#B0EBB4", lbColor: "#1A4D2E" },
    Open: { bgColor: "#F5F5F7", lbColor: "#181C14" },
  };

  const [openForm, setOpenForm] = useState(false);

  const [detail, setDetail] = useState("");

  const handleDelete = async () => {
    const result = await showDialog({
      title: "Confirmation",
      message: "Are you sure you want to delete this item?",
      icon: "error", // "warning" may be more appropriate than "error" for a confirmation
      btnConfirmText: "Delete",
      btnCancelText: "Cancel",
    });
    if (result) {
      // Proceed with deletion logic
      console.log("Item deleted.");
    } else {
      console.log("Deletion canceled.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {index !== 0 && (
          <Box
            sx={{
              width: "2px",
              flex: 1,
              bgcolor: theme.palette.divider,
              mt: 1,
            }}
          />
        )}
      </Box>

      <Card sx={{ flex: 1, p: 2, bgcolor: "background.paper" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: "#455A64" }} />
            <Typography
              variant="body2"
              sx={{ color: "#455A64", fontWeight: "bold" }}
            >
              {format(item.timestamp, "MMMM d, yyyy")}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <StatusChip label={item.status} status={item.status} />
            <IconButton
              sx={{
                border: "1px solid gray",
                borderRadius: 2,
                ":hover": { color: "#FF9D3D", border: "1px solid #FF9D3D" },
              }}
              size="small"
              onClick={() => setOpenForm(true)}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <IconButton
              sx={{
                border: "1px solid gray",
                borderRadius: 2,
                ":hover": { color: "red", border: "1px solid red" },
              }}
              size="small"
              onClick={() => handleDelete()}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1 }} />
        <Stack direction={"row"} spacing={1}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={"bold"}
            sx={{ color: "#455A64" }}
          >
            Event:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Meeting
          </Typography>
        </Stack>
        <Stack direction={"column"} spacing={0.5}>
          <Typography
            variant="body2"
            sx={{ color: "#455A64" }}
            fontWeight={"bold"}
          >
            Detail:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {item.description}
          </Typography>
        </Stack>
      </Card>
      {DialogComponent}
      <AddEventDialog open={openForm} onClose={() => setOpenForm(false)} />
      {/* <Dialog
        open={openForm}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(1px)",
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
            <IconButton onClick={() => setOpenForm(false)} size="small">
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
                  <MenuItem value={50}>Deleted</MenuItem>
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
                  <MenuItem value={50}>Bug fixes</MenuItem>
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
              onClick={() => setOpenForm(false)}
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
                  backgroundImage:
                    "linear-gradient(to right, #1d4ed8, #2563eb)",
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </DialogContent>
      </Dialog> */}
    </Box>
  );
}
