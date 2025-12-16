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
  Drawer,
  IconButton,
  Stack,
  Divider,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useSnackbar } from "notistack";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function LogoQuizGame({ username, socket }) {
  const [roundData, setRoundData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [score, setScore] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [logoLeaderboard, setLogoLeaderboard] = useState([]);
  const [scorePopup, setScorePopup] = useState({ open: false, points: 0 });
  const [wrongPopup, setWrongPopup] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    socket.emit("login", username);

    socket.on("logoRoundStarted", (data) => {
      const { expiresAt } = data;
      setRoundData(data);
      setSelected(null);
      setAnswered(false);
      setWrongPopup(false);

      const now = Date.now();
      const diff = Math.floor((expiresAt - now) / 1000);
      setCountdown(diff > 0 ? diff : 0);
    });

    socket.on("logoGameReset", () => {
      setScore(0);
      setRoundData(null); // Reset round data
      setLogoLeaderboard([]);
    });

    socket.on("scoreUpdatedLogo", ({ username: fromUser, score, points }) => {
      if (fromUser !== username) return;
      setScore(score);

      if (points > 0) {
        enqueueSnackbar(`+${points} คะแนน! 🎉`, { variant: "success" });
      } else if (points < 0) {
        enqueueSnackbar("-1 คะแนน ❌ ตอบผิด", { variant: "error" });
      }
    });

    socket.on("logoLeaderboard", (list) => {
      setLogoLeaderboard(list || []);
    });

    return () => {
      socket.off("logoRoundStarted");
      socket.off("scoreUpdatedLogo");
      socket.off("logoGameReset");
      socket.off("logoLeaderboard");
    };
  }, []);

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

    setCountdown(0);
    setAnswered(true);
    setSelected("ANSWERED");
  };

  const animalNameMap = {
    Lion: "สิงโต",
    Zebra: "ม้าลาย",
  };

  const getInstructionText = () => {
    if (!roundData) return "";

    const brand = roundData.brand;
    const isReal = roundData.correctType === "real";
    const animalBrands = ["Lion", "Tiger", "Cat", "Dog", "Zebra"];

    if (animalBrands.includes(brand)) {
      const thaiName = animalNameMap[brand] || brand;
      return isReal
        ? `ภาพไหนคือ ${thaiName} จริง?`
        : `ภาพไหนคือ ${thaiName} ปลอม?`;
    }

    return isReal
      ? `ภาพไหนคือโลโก้ของ ${brand} จริง?`
      : `ภาพไหนคือโลโก้ของ ${brand} ปลอม?`;
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
      {!roundData ? ( // Show lobby if roundData is null
        <>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            🎯 เกมส์ทายรูปภาพ
          </Typography>

          <Typography
            textAlign="center"
            sx={{ mb: 1 }}
            variant="h5"
            color="info"
          >
            รอผู้ดูแลเริ่มเกม...
          </Typography>

          <Card
            sx={{
              p: 3,
              mb: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
              textAlign="center"
            >
              วิธีการเล่น
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              1. คุณจะเห็นภาพโลโก้หรือสัตว์และโจทย์คำถาม
            </Typography>
            <Typography variant="body1" color="text.secondary">
              2. เลือกภาพที่คุณคิดว่าถูกต้องที่สุด
            </Typography>
            <Typography variant="body1" color="text.secondary">
              3. หากเลือกถูกจะได้รับคะแนน
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1, pl: 2 }}
            >
              - เวลาเหลือมากกว่า 8 วินาที +3 คะแนน
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ pl: 2 }}>
              - เวลาเหลือมากกว่า 5 วินาที +2 คะแนน
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ pl: 2 }}>
              - เวลาเหลือมากกว่า 3 วินาที +1 คะแนน
            </Typography>
            <Typography variant="body1" color="error.main" sx={{ pl: 2 }}>
              - ตอบผิด -1 คะแนน
            </Typography>
          </Card>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            🎯 เกมส์ทายรูปภาพ
          </Typography>

          <Typography
            textAlign="center"
            sx={{ mb: 1 }}
            variant="h5"
            color="info"
          >
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
                    countdown > 0 &&
                    selected !== "ANSWERED" &&
                    setSelected(index)
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
              background:
                "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b46c1 100%)",
              boxShadow: "0 4px 12px rgba(30,58,138,0.4)",
            }}
          >
            ส่งคำตอบ
          </Button>
        </>
      )}

      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          bgcolor: "white",
          color: "black",
          boxShadow: 0,
          borderRadius: 3,
        }}
      >
        {/* 🏆 */}

        <Typography> 🏆 ดูตารางอันดับ</Typography>
      </IconButton>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: "55vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6">🏆 อันดับสูงสุด</Typography>

          <IconButton fontSize="small" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 2 }} />

        {logoLeaderboard.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
            ยังไม่มีผู้เล่นในอันดับ
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              overflowY: "auto",
              maxHeight: "100%",
              pt: 1,
            }}
          >
            {logoLeaderboard.map((player, index) => (
              <ListItem key={player.username}>
                <ListItemAvatar>
                  <Avatar>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${player.username}`}
                  secondary={`คะแนน: ${player.score}`}
                />
              </ListItem>
            ))}
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
