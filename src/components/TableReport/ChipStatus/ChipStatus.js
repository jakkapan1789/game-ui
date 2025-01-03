import { Chip } from "@mui/material";
// assume status 1 = approved, 2 = pedding, 3 = draft, 4 = reject
const ChipStatus = ({ status, defaultData, reApp }) => {
  const displayStatus = (status) => {
    if (defaultData) {
      return defaultData;
    }
    switch (status) {
      case 2:
        return "อนุมัติ";
      case 1:
        return "Pending";
      case 0:
        return "Open";
      case 3:
        return "ไม่อนุมัติ";
      default:
        return "ไม่พบสถานะ";
    }
  };
  return (
    <Chip
      label={displayStatus(status)}
      size="small"
      sx={{
        border: `1px solid ${
          status === 2
            ? "#1877F2"
            : status === 1
            ? "#FF852C"
            : status === 0
            ? ""
            : status === 3
            ? "#E1251B"
            : ""
        }`,
        color:
          status === 2
            ? "#1877F2"
            : status === 1
            ? "#FF852C"
            : status === 0
            ? ""
            : status === 3
            ? "#E1251B"
            : "",
        bgcolor:
          status === 2
            ? "#E8F0FF"
            : status === 1
            ? "#FFF8E1"
            : status === 0
            ? ""
            : status === 3
            ? "#FFD3D3"
            : "",
      }}
    />
  );
};

export default ChipStatus;
