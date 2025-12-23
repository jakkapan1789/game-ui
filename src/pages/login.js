import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import { useRouter } from "next/router";
import { preloadImage } from "@/utils/preloadImage";

const GAME_IMAGES = [
  "/images/rubber-duck.png",
  "/images/smiling.png",
  "/images/golf-club.png",
  "/images/dolphin.png",
  "/images/Tea-Rex.png",
  "/images/koala.png",
  "/images/cat.png",
  "/images/dog.png",
  "/logos/apple_real.png",
  "/logos/apple_fake.png",
  "/logos/sb_real.png",
  "/logos/sb_fake.png",
  "/logos/7-11-real.png",
  "/logos/7-11-fake.png",
  "/logos/fbn-real.png",
  "/logos/fbn-fake.png",
  "/logos/honda-real.png",
  "/logos/honda-fake.png",
  "/logos/msbs-real.png",
  "/logos/msbs-fake.png",
  "/logos/pepsi-real.png",
  "/logos/pepsi-fake.png",
  "/logos/tesla-real.png",
  "/logos/tesla-fake.png",
  "/logos/toyota-real.png",
  "/logos/toyota-fake.png",
  "/logos/lion-real.png",
  "/logos/lion-fake.jpeg",
  "/logos/zebra-real.png",
  "/logos/zebra-fake.png",
  "/logos/cat-like.png",
  "/logos/lion-like.png",
  "/logos/raccoon-mafia.png",
  "/logos/cat-mafia.png",
  "/logos/cute-panda.png",
  "/logos/cat-panda.png",
  "/logos/strong-cat.png",
  "/logos/strong-panda.png",
  "/logos/microsoft-real.png",
  "/logos/microsoft-fake.png",
  "/logos/dog-real.png",
  "/logos/dog-fake.png",
  "/logos/bgk-real.png",
  "/logos/bgk-fake.png",
  "/logos/google-drive.png",
  "/logos/google-drive-fake.png",
  "/logos/youtube.png",
  "/logos/youtube-fake.png",
  "/logos/gmail.png",
  "/logos/gmail-fake.png",
  "/logos/google-map.png",
  "/logos/google-map-fake.png",
];
export default function App() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      localStorage.setItem("username", username);
      // setTimeout(() => {
      //   setLoading(false);
      //   router.push("/play");
      // }, 1800);
      let loaded = 0;
      Promise.all(
        GAME_IMAGES.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                loaded++;
                setProgress(Math.round((loaded / GAME_IMAGES.length) * 100));
                resolve();
              };
            })
        )
      ).then(() => {
        setReady(true);
        router.push("/play");
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login - IT Games</title>
      </Head>

      <Box
        sx={{
          height: "100dvh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b46c1 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 12s ease infinite",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "90%",
            maxWidth: 380,
            backdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 4,
            p: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white",
            ml: 2,
            mr: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: "0 0 12px rgba(255,255,255,0.6)",
              letterSpacing: "1px",
            }}
          >
            IT Games
          </Typography>

          <Typography
            sx={{
              opacity: 0.85,
              fontSize: "0.9rem",
              mb: 3,
              textAlign: "center",
            }}
          >
            ใส่ชื่อเล่นของคุณเพื่อเริ่มต้นความสนุก!
          </Typography>

          <TextField
            fullWidth
            label="ชื่อเล่น"
            variant="filled"
            autoComplete="off"
            InputProps={{
              disableUnderline: true,
              style: {
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(4px)",
              },
            }}
            InputLabelProps={{ style: { color: "#eee" } }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              mb: 2,
              "& .MuiFilledInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "& .MuiFilledInput-root:before": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root:after": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root.Mui-focused:after": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root.Mui-focused:before": {
                borderBottom: "none !important",
              },
              "& .MuiInputBase-input": {
                fontSize: "16px !important",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px !important",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1.05rem",
              textTransform: "none",
              background: "linear-gradient(90deg,#4f46e5,#9333ea)",
              boxShadow: "0 0 12px rgba(147,51,234,0.7)",
              "&:hover": {
                background: "linear-gradient(90deg,#4338ca,#7e22ce)",
                boxShadow: "0 0 18px rgba(147,51,234,0.9)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "▶ เข้าสู่เกม"
            )}
          </Button>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            color: "white",
            opacity: 0.8,
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} IT Games — Powered by Idelix Nimble
        </Box>
      </Box>
    </>
  );
}
