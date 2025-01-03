import { Chip } from "@mui/material";

const STATUS_COLORS = {
  Pending: { bgColor: "#FFF3E0", lbColor: "#FF5722" }, // Soft orange
  Completed: { bgColor: "#E8F5E9", lbColor: "#4CAF50" }, // Soft green
  Cancel: { bgColor: "#FBE9E7", lbColor: "#D32F2F" }, // Soft red
  Reopened: { bgColor: "#E3F2FD", lbColor: "#1976D2" }, // Soft blue
  Hold: { bgColor: "#FFFDE7", lbColor: "#FBC02D" }, // Soft yellow
};

const StatusChip = ({ label, status }) => {
  // Use a fallback if the status is undefined or not found in STATUS_COLORS
  const { bgColor, lbColor } = STATUS_COLORS[status] || {
    bgColor: "#E0E0E0", // Default grey background
    lbColor: "black", // Default grey label color
  };

  return (
    <Chip
      size="small"
      sx={{
        px: 0.5,
        bgcolor: bgColor,
        color: lbColor,
        border: `1px solid ${lbColor}`,
      }}
      label={label}
    />
  );
};

export default StatusChip;
