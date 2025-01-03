import { Chip } from "@mui/material";

const STATUS_COLORS = {
  High: { bgColor: "#FAD4D4", lbColor: "#FF4C4C" },
  Medium: { bgColor: "#FFF8E1", lbColor: "#FF852C" },
  Low: { bgColor: "#D4EBF8", lbColor: "#0A3981" },
};

const PriorityChip = ({ label, status }) => {
  const { bgColor, lbColor } = STATUS_COLORS[status] || {
    bgColor: "#E0E0E0", // Default grey background
    lbColor: "#757575", // Default grey label
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

export default PriorityChip;
