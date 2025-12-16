import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  //   return (
  //     <Stack
  //       direction="row"
  //       spacing={{ xs: 2, md: 3, lg: 4 }}
  //       justifyContent="center"
  //       alignItems="flex-start"
  //       flexWrap="wrap"
  //       sx={{ position: "relative" }}
  //     >
  //       {timeUnits.map((unit, index) => (
  //         <Box
  //           key={unit.label}
  //           sx={{
  //             position: "relative",
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             color: "white",
  //           }}
  //         >
  //           {/* Card */}
  //           <Box
  //             sx={{
  //               px: { xs: 2, md: 3, lg: 4 },
  //               py: { xs: 2, md: 3 },
  //               minWidth: { xs: 80, md: 120, lg: 140 },
  //               textAlign: "center",
  //               borderRadius: 2,
  //               backdropFilter: "blur(14px)",
  //               background:
  //                 "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
  //               border: "1px solid rgba(0,229,255,0.4)",
  //               boxShadow:
  //                 "0 0 20px rgba(0,229,255,0.35), inset 0 0 20px rgba(255,255,255,0.08)",
  //             }}
  //           >
  //             <Typography
  //               sx={{
  //                 fontSize: { xs: 32, md: 52, lg: 64 },
  //                 fontWeight: 800,
  //                 color: "white",
  //                 fontFamily: "monospace",
  //               }}
  //             >
  //               {String(unit.value).padStart(2, "0")}
  //             </Typography>
  //           </Box>

  //           {/* Label */}
  //           <Typography
  //             sx={{
  //               mt: 2,
  //               fontSize: { xs: 12, md: 14 },
  //               color: "white",
  //               letterSpacing: "0.25em",
  //               textTransform: "uppercase",
  //               fontWeight: 500,
  //             }}
  //           >
  //             {unit.label}
  //           </Typography>

  //           {/* Colon */}
  //           {index < timeUnits.length - 1 && (
  //             <Typography
  //               sx={{
  //                 display: { xs: "none", md: "block" },
  //                 position: "absolute",
  //                 right: -24,
  //                 top: "35%",
  //                 fontSize: 40,
  //                 fontWeight: 800,
  //                 color: "primary.main",
  //                 textShadow:
  //                   "0 0 12px rgba(0,229,255,0.8), 0 0 32px rgba(0,229,255,0.6)",
  //               }}
  //             >
  //               :
  //             </Typography>
  //           )}
  //         </Box>
  //       ))}

  //       {/* Animations */}
  //       <style>
  //         {`
  //           @keyframes glow {
  //             0% {
  //               box-shadow: 0 0 16px rgba(0,229,255,0.4),
  //                           inset 0 0 12px rgba(255,255,255,0.05);
  //             }
  //             50% {
  //               box-shadow: 0 0 32px rgba(0,229,255,0.7),
  //                           inset 0 0 24px rgba(255,255,255,0.1);
  //             }
  //             100% {
  //               box-shadow: 0 0 16px rgba(0,229,255,0.4),
  //                           inset 0 0 12px rgba(255,255,255,0.05);
  //             }
  //           }
  //         `}
  //       </style>
  //     </Stack>
  //   );
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: {
            xs: "grid",
            md: "flex",
          },
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // ⭐ mobile = 2 columns
          },
          gap: { xs: 2, md: 3, lg: 4 },
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          maxWidth: "fit-content",
        }}
      >
        {timeUnits.map((unit, index) => (
          <Box
            key={unit.label}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1, md: 2 },
            }}
          >
            {/* Card + Label */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
              }}
            >
              <Box
                sx={{
                  px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
                  py: { xs: 1.5, sm: 2, md: 3 },
                  minWidth: { xs: 72, sm: 90, md: 120, lg: 140 },
                  textAlign: "center",
                  borderRadius: 2,
                  backdropFilter: "blur(14px)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(0,229,255,0.4)",
                  boxShadow:
                    "0 0 18px rgba(0,229,255,0.35), inset 0 0 16px rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 24, sm: 32, md: 52, lg: 64 },
                    fontWeight: 800,
                    color: "white",
                    fontFamily: "monospace",
                    lineHeight: 1,
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: { xs: 1, md: 2 },
                  fontSize: { xs: 10, sm: 12, md: 14 },
                  color: "white",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {unit.label}
              </Typography>
            </Box>

            {/* Colon (desktop only) */}
            {index < timeUnits.length - 1 && (
              <Typography
                sx={{
                  display: { xs: "none", md: "block" }, // ⭐ mobile ซ่อน
                  fontSize: { md: 40, lg: 48 },
                  fontWeight: 800,
                  color: "primary.main",
                  mb: 3,
                  textShadow:
                    "0 0 12px rgba(0,229,255,0.8), 0 0 32px rgba(0,229,255,0.6)",
                }}
              >
                :
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CountdownTimer;
