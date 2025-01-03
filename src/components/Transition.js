import { Box } from "@mui/material";

export default function Transition({ children }) {
  return (
    <Box data-aos="fade-up" data-aos-duration="700">
      {children}
    </Box>
  );
}
