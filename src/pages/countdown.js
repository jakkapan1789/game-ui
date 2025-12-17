import { Box, Container, Typography, Button } from "@mui/material";
import Head from "next/head";
import CountdownTimer from "@/components/ui/CountdownTimer";
import ParticleBackground from "@/components/ui/ParticleBackground";

const Index = () => {
  const targetDate = new Date("2025-12-26T19:00:00");

  return (
    <>
      <Head>
        <title>Counting down to the IT New Year Party 2026</title>
      </Head>
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
            <Typography
              variant="overline"
              sx={{
                display: "block",
                letterSpacing: "0.3em",
                color: "white",
                mb: 4,
                mt: 2,
              }}
            >
              December 26, 2025, 7:00 PM
            </Typography>
          </Box>{" "}
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#4f46e5,#9333ea)",
              boxShadow: "0 0 12px rgba(147,51,234,0.7)",
              "&:hover": {
                background: "linear-gradient(90deg,#4338ca,#7e22ce)",
                boxShadow: "0 0 18px rgba(147,51,234,0.9)",
              },
              textTransform: "none",
            }}
            onClick={() =>
              window.open("https://maps.app.goo.gl/P8JBew4kqVoq2eCT9", "_blank")
            }
          >
            Restaurant Map
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Index;
