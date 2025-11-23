import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";

export default function LogoQuizGame({ username, socket }) {
  const [roundData, setRoundData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [score, setScore] = useState(0);

  // ⭐ popup คะแนน + popup ตอบผิด
  const [scorePopup, setScorePopup] = useState({ open: false, points: 0 });
  const [wrongPopup, setWrongPopup] = useState(false);

  // ⭐ ซ่อนรูปหลังตอบ
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    socket.emit("login", username);

    socket.on("logoRoundStarted", (data) => {
      const { expiresAt } = data;
      console.log("data-check", data);

      setRoundData(data);
      setSelected(null);
      setAnswered(false); // ⭐ แสดงรูปใหม่
      setWrongPopup(false);

      const now = Date.now();
      const diff = Math.floor((expiresAt - now) / 1000);
      setCountdown(diff > 0 ? diff : 0);
    });

    socket.on("logoGameReset", () => {
      setScore(0);
    });

    socket.on("scoreUpdatedLogo", ({ score, points }) => {
      setScore(score);

      // console.log("points", score);s
      if (points > 0) {
        // ⭐ คะแนนปกติ
        setScorePopup({ open: true, points });
        setTimeout(() => setScorePopup({ open: false, points: 0 }), 2000);
      }
    });

    return () => {
      socket.off("logoRoundStarted");
      socket.off("scoreUpdatedLogo");
      socket.off("logoGameReset");
    };
  }, []);

  // Countdown
  useEffect(() => {
    if (!countdown) return;

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleSubmit = () => {
    if (!roundData || selected === null) return;

    socket.emit("answerLogo", {
      username,
      roundId: roundData.roundId,
      choiceIndex: selected,
    });

    // ⭐ หยุดเวลาและซ่อนภาพทันที
    setCountdown(0);
    setAnswered(true);

    setSelected("ANSWERED");
  };

  const getInstructionText = () => {
    if (!roundData) return "";

    const brand = roundData.brand;
    const isReal = roundData.correctType === "real";

    // ถ้าชื่อ brand เป็นสัตว์ เช่น “Lion”
    const animalBrands = ["Lion", "Tiger", "Cat", "Dog"];

    if (animalBrands.includes(brand)) {
      return isReal
        ? `ภาพไหนคือ ${brand === "Lion" ? "สิงโต" : brand} จริง?`
        : `ภาพไหนคือ ${brand === "Lion" ? "สิงโต" : brand} ปลอม?`;
    }

    // default สำหรับแบรนด์ (Logo)
    return isReal
      ? `ภาพไหนคือโลโก้ของ ${brand} จริง?`
      : `ภาพไหนคือโลโก้ของ ${brand} ปลอม?`;
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        🎯 เกมส์ทายรูปภาพ
      </Typography>

      <Typography textAlign="center" sx={{ mb: 1 }} variant="h5" color="info">
        คะแนนรวมของคุณ: <b>{score}</b>
      </Typography>

      {roundData && (
        <Typography
          textAlign="center"
          sx={{ mb: 2, fontSize: "1.3rem", fontWeight: "bold" }}
          color="error"
        >
          {getInstructionText()}
        </Typography>
      )}

      {roundData && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={countdown <= 3 ? "error.main" : "primary.main"}
          >
            {countdown}s
          </Typography>

          <LinearProgress
            variant="determinate"
            value={(countdown / (roundData.durationMs / 1000)) * 100}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />
        </Box>
      )}

      {/* ⭐ ซ่อนรูปเมื่อกดตอบ */}
      {roundData ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ mt: 1, px: 1 }}
        >
          {roundData.choices.map((c, index) => (
            <Grid item xs={6} key={index}>
              <Card
                onClick={() =>
                  countdown > 0 && selected !== "ANSWERED" && setSelected(index)
                }
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 180, md: 220 },
                  border:
                    selected === index
                      ? "4px solid #3b82f6"
                      : "2px solid transparent",
                  cursor: countdown > 0 ? "pointer" : "not-allowed",
                  opacity: countdown > 0 ? 1 : 0.4,
                  borderRadius: 3,
                  transition: "0.2s",
                  transform: selected === index ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    selected === index
                      ? "0 0 10px rgba(59,130,246,0.6)"
                      : "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={c.image}
                  style={{
                    width: "90%",
                    height: "80%",
                    objectFit: "contain",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : roundData ? (
        <Typography textAlign="center" sx={{ mt: 5 }} color="text.secondary">
          ⏳ คุณได้ตอบไปแล้ว รอรอบถัดไป...
        </Typography>
      ) : (
        <Typography textAlign="center" sx={{ mt: 5 }} color="text.secondary">
          รอรอบใหม่จากผู้ดูแลระบบ...
        </Typography>
      )}

      {roundData && (
        <Button
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          disabled={
            countdown === 0 || selected === null || selected === "ANSWERED"
          }
          sx={{
            mt: 2,
            py: 2,
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: 3,
            textTransform: "none",
            backgroundImage:
              "linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa)",
            boxShadow: "0 4px 12px rgba(30,58,138,0.4)",
          }}
        >
          ส่งคำตอบ
        </Button>
      )}

      {/* ⭐ popup ถูกต้อง */}
      <Snackbar
        open={scorePopup.open}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 8 }}
      >
        <Alert severity="success" variant="filled">
          +{scorePopup.points} คะแนน!
        </Alert>
      </Snackbar>

      {/* ⭐ popup ตอบผิด */}
      <Snackbar
        open={wrongPopup}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 8 }}
      >
        <Alert severity="error" variant="filled">
          +0 คะแนน ❌ ตอบผิด
        </Alert>
      </Snackbar>
    </Box>
  );
}
