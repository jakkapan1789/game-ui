import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useLoading } from "@/context/hook";

const BackdropLoading = () => {
  const { isLoading } = useLoading();

  return (
    <Backdrop
      sx={{
        zIndex: 99999,
        backdropFilter: "blur(0.1px)",
      }}
      open={isLoading}
    >
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          size={60}
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </React.Fragment>
    </Backdrop>
  );
};

export default BackdropLoading;
