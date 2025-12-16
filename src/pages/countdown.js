import { Box, Container, Typography, Stack, Button } from "@mui/material";

import CountdownTimer from "@/components/ui/CountdownTimer";
import ParticleBackground from "@/components/ui/ParticleBackground";

const Index = () => {
  const targetDate = new Date("2025-12-26T19:00:00");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#06070a",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <ParticleBackground />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at top, rgba(0,229,255,0.25), transparent 60%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at bottom right, rgba(255,0,255,0.25), transparent 60%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      </Box>

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 8, md: 10 },
          textAlign: "center",
        }}
      >
        <Box mb={12}>
          <Typography
            variant="overline"
            sx={{
              display: "block",
              letterSpacing: "0.3em",
              color: "white",
              mb: 4,
            }}
          >
            Counting down to the IT New Year Party 2026.
          </Typography>

          <CountdownTimer targetDate={targetDate} />
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
