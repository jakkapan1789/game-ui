import { styled } from "@mui/system";
import { Skeleton } from "@mui/material";

const CustomWaveSkeleton = styled(Skeleton)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.palette.grey[200],
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundImage: `linear-gradient(90deg, transparent, ${theme.palette.grey[300]}, transparent)`,
    animation: "gradient-wave 1.2s ease-in-out infinite",
  },
  "@keyframes gradient-wave": {
    "0%": { transform: "translateX(-100%)" },
    "50%": { transform: "translateX(50%)" },
    "100%": { transform: "translateX(100%)" },
  },
}));

export default CustomWaveSkeleton;
