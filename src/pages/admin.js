import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  Card,
  Chip,
  Divider,
  Tab,
  Tabs,
  Snackbar,
  Alert,
  Grid,
  MenuItem,
} from "@mui/material";
import Head from "next/head";
import Layout from "@/components/Layout";
import { SnackbarProvider, useSnackbar } from "notistack";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);

// รายการโลโก้ให้แอดมินเลือก
const LOGO_OPTIONS = [
  "Apple",
  "Starbuck",
  "7-Elevent",
  "Fabrinet",
  "Honda",
  "Mitsubishi",
  "Pepsi",
  "Tesla",
  "Toyota",
  "Lion",
  "Zebra",
  "Cat",
  "Raccoon",
  "Panda",
  "Strong Cat",
  "Microsoft",
  "Dog",
];

const AdminPage = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [gameId, setGameId] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  // 🟧 Logo Quiz State
  const [logoRound, setLogoRound] = useState(null);
  const [logoScores, setLogoScores] = useState({});
  const [selectedLogo, setSelectedLogo] = useState(LOGO_OPTIONS[0]);
  const [logoLeaderboard, setLogoLeaderboard] = useState([]);
  const [correctType, setCorrectType] = useState("real"); // ⭐ เพิ่มค่า default

  // ───────────── SOCKET INIT ─────────────

  useEffect(() => {
    socket.emit("login", "Admin");

    // ───────────── Register ─────────────
    socket.on("updateUsers", (updated) => setUsers(updated));

    const handleAnswerReceived = (data) => {
      console.log("answerReceived", data);
      setAnswers((prev) => [...prev, data]);
    };
    socket.on("answerReceived", handleAnswerReceived);

    socket.on("gameActive", (gameNo) => {
      console.log("🎮 Active Game from server:", gameNo);
      setTabIndex(gameNo);
    });

    socket.on("currentGame", (gameNo) => {
      console.log("📦 Current game:", gameNo);
      setTabIndex(gameNo);
    });

    socket.on("gameStartedBingo", ({ game_id, drawnNumbers }) => {
      setGameId(game_id);
      setDrawnNumbers(drawnNumbers || []);
      localStorage.setItem("admin_bingo_id", game_id);
      localStorage.setItem(
        "admin_bingo_numbers",
        JSON.stringify(drawnNumbers || [])
      );
    });

    socket.on("bingoNumber", ({ game_id, drawnNumbers }) => {
      setGameId(game_id);
      setDrawnNumbers(drawnNumbers);
      localStorage.setItem("admin_bingo_id", game_id);
      localStorage.setItem("admin_bingo_numbers", JSON.stringify(drawnNumbers));
    });

    // 🟧 Logo Quiz Listener
    socket.on("logoRoundStarted", (data) => {
      setLogoRound(data);
    });

    socket.on("scoreUpdatedLogo", ({ username, score }) => {
      setLogoScores((prev) => ({
        ...prev,
        [username]: score,
      }));
    });

    socket.on("logoLeaderboard", (list) => {
      setLogoLeaderboard(list || []);
    });

    socket.on("logoGameReset", () => {
      setLogoRound(null);
      setLogoScores({});
      setLogoLeaderboard([]);
    });

    // ───────────── Restore Saved State ─────────────
    const savedId = localStorage.getItem("admin_bingo_id");
    const savedNums = localStorage.getItem("admin_bingo_numbers");
    if (savedId && savedNums) {
      setGameId(savedId);
      setDrawnNumbers(JSON.parse(savedNums));
    }

    // ───────────── Cleanup ─────────────
    return () => {
      socket.off("updateUsers");
      socket.off("answerReceived", handleAnswerReceived);
      socket.off("gameActive");
      socket.off("currentGame");
      socket.off("gameStartedBingo");
      socket.off("bingoNumber");
      socket.off("logoRoundStarted");
      socket.off("scoreUpdatedLogo");
      socket.off("logoLeaderboard");
      socket.off("logoGameReset");
    };
  }, []);

  // ───────────── UTILITIES ─────────────

  const handleTabChange = (e, value) => {
    setTabIndex(value);
    socket.emit("gameActive", value);
  };

  // ───────────── GAME CONTROL ─────────────
  const handleStartQuestion = () => {
    if (!question.trim())
      return enqueueSnackbar(`โปรดกรอกคำถามก่อนส่ง`, { variant: "error" });
    socket.emit("newQuestion", question);
    setQuestion("");
    setAnswers([]);
    enqueueSnackbar(`ส่งคำถามเรียบร้อยแล้ว`, { variant: "success" });
  };

  const handleStartMemory = () => {
    socket.emit("startGameMemory");
    enqueueSnackbar(`เริ่มเกมส์จับคู่ภาพแล้ว`, { variant: "success" });
  };

  const handleStartBingo = () => {
    socket.emit("startGameBingo");
    localStorage.removeItem("admin_bingo_id");
    localStorage.removeItem("admin_bingo_numbers");
    setDrawnNumbers([]);
    setGameId(null);
    enqueueSnackbar(`เริ่มเกมบิงโกใหม่แล้ว`, { variant: "success" });
  };

  const handleDrawBingo = () => socket.emit("drawBingoNumber");

  const handleClearBingo = () => {
    localStorage.removeItem("admin_bingo_numbers");
    setDrawnNumbers([]);
    enqueueSnackbar(`เคลียร์หมายเลขที่ออกแล้วเรียบร้อย`, { variant: "info" });
  };

  // 🟧 Logo Quiz: Start Round
  const handleStartLogoQuiz = () => {
    if (!selectedLogo)
      return enqueueSnackbar(`กรุณาเลือกโลโก้ก่อน`, { variant: "error" });

    socket.emit("startLogoRoundAdmin", {
      brand: selectedLogo,
      correctType: correctType,
    });

    enqueueSnackbar(
      `เริ่มรอบเกมส์โลโก้: ${selectedLogo} (ตอบ ${correctType})`,
      { variant: "success" }
    );
  };

  // 🟧 Logo Quiz: Reset Game
  const handleResetLogoGame = () => {
    socket.emit("resetLogoGame");
    enqueueSnackbar(`รีเซ็ตเกมส์ทายโลโก้เรียบร้อย`, { variant: "info" });
  };

  // ───────────── UI ─────────────
  return (
    <>
      {" "}
      <Head>
        <title>Controller - IT Games</title>
      </Head>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
      >
        <Layout username="Admin" users={users}>
          <Box sx={{ height: "calc(100vh - 64px)", p: 2 }}>
            <Card sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  แผงควบคุมผู้ดูแลระบบเกม
                </Typography>
                <Chip
                  label={`${users.length} ออนไลน์`}
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #72BF78, #15B392)",
                    color: "white",
                  }}
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable" // ⭐ เพิ่ม
                scrollButtons="auto" // ⭐ แสดงปุ่มเลื่อนบน desktop
                allowScrollButtonsMobile // ⭐ เปิดปุ่มบนมือถือด้วย (MUI v5+)
                sx={{
                  mb: 2,
                  "& .MuiTab-root": {
                    minWidth: "120px", // ⭐ ให้เลื่อนได้ดีบนมือถือ
                  },
                }}
              >
                <Tab label="ตอบคำถาม" />
                <Tab label="จับคู่ภาพ" />
                <Tab label="บิงโก" />
                <Tab label="ทายโลโก้" />
              </Tabs>

              {/* TAB 0: QUESTION */}
              {tabIndex === 0 && (
                <Box>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <Typography fontWeight="bold">ส่งคำถามใหม่</Typography>
                    <TextField
                      label="ระบุคำถาม"
                      fullWidth
                      size="small"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleStartQuestion}
                      sx={{
                        mt: 2,
                        backgroundImage:
                          "linear-gradient(to right, #1e3a8a, #3b82f6)",
                      }}
                    >
                      ส่งคำถาม
                    </Button>
                  </Card>

                  <Typography fontWeight="bold">คำตอบของผู้เล่น</Typography>
                  <Card sx={{ p: 2 }}>
                    <List>
                      {answers.length ? (
                        answers.map((a, i) => (
                          <ListItem key={i}>
                            <ListItemAvatar>
                              <Avatar>{i + 1}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={a.username}
                              secondary={a.answer}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <Typography textAlign="center" color="text.secondary">
                          ยังไม่มีคำตอบ
                        </Typography>
                      )}
                    </List>
                  </Card>
                </Box>
              )}

              {/* TAB 1: MEMORY */}
              {tabIndex === 1 && (
                <Box>
                  <Card sx={{ p: 2 }}>
                    <Typography fontWeight="bold">
                      กดเพื่อเริ่มเกมส์ความจำ
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleStartMemory}
                      sx={{
                        mt: 1,
                        backgroundImage:
                          "linear-gradient(to right, #1e3a8a, #3b82f6)",
                      }}
                    >
                      เริ่มเกมส์ความจำ
                    </Button>
                  </Card>
                </Box>
              )}

              {/* TAB 2: BINGO */}
              {tabIndex === 2 && (
                <Box>
                  <Card sx={{ p: 2 }}>
                    <Typography fontWeight="bold" gutterBottom>
                      ควบคุมเกมส์บิงโก
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                      🎮 รหัสรอบเกม: {gameId || "-"}
                    </Typography>

                    <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleStartBingo}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #1e3a8a, #3b82f6)",
                        }}
                      >
                        เริ่มเกมส์ใหม่
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleDrawBingo}
                        disabled={!gameId}
                      >
                        สุ่มหมายเลข
                      </Button>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Typography fontWeight="bold">
                      หมายเลขที่ออกแล้ว ({drawnNumbers.length})
                    </Typography>

                    <Grid container spacing={1}>
                      {drawnNumbers.map((num, i) => (
                        <Grid item key={i}>
                          <Chip label={num} color="primary" />
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </Box>
              )}

              {/* TAB 3: LOGO QUIZ */}
              {tabIndex === 3 && (
                <Box>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <Typography fontWeight="bold" gutterBottom>
                      ควบคุมเกมส์ทายโลโก้ (จริง / ปลอม)
                    </Typography>

                    <TextField
                      select
                      label="เลือกโลโก้"
                      fullWidth
                      size="small"
                      value={selectedLogo}
                      onChange={(e) => setSelectedLogo(e.target.value)}
                      sx={{ mt: 1 }}
                    >
                      {LOGO_OPTIONS.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* ⭐ ส่วนใหม่: เลือกตอบจริง/ปลอม */}
                    <TextField
                      select
                      label="ต้องตอบรูปอะไรถึงจะได้คะแนน?"
                      fullWidth
                      size="small"
                      value={correctType}
                      onChange={(e) => setCorrectType(e.target.value)}
                      sx={{ mt: 2 }}
                    >
                      <MenuItem value="real">✔ รูปจริง (Real)</MenuItem>
                      <MenuItem value="fake">✘ รูปปลอม (Fake)</MenuItem>
                    </TextField>

                    <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleStartLogoQuiz}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #1e3a8a, #3b82f6)",
                        }}
                      >
                        เริ่มรอบใหม่
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleResetLogoGame}
                        sx={{ textTransform: "none" }}
                      >
                        Reset เกมส์โลโก้
                      </Button>
                    </Stack>
                  </Card>

                  {/* ข้อมูลรอบปัจจุบัน */}
                  {logoRound && (
                    <Card sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        แบรนด์ปัจจุบัน: {logoRound.brand}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        คำตอบที่ถูกต้อง:{" "}
                        <b>
                          {logoRound.correctType === "real"
                            ? "รูปจริง"
                            : "รูปปลอม"}
                        </b>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        จำนวนตัวเลือก: {logoRound.choices?.length || 0}
                      </Typography>
                    </Card>
                  )}

                  {/* Top 3 Leaderboard */}
                  <Card sx={{ p: 2 }}>
                    <Typography fontWeight="bold" gutterBottom>
                      Top 10 ผู้เล่นคะแนนสูงสุด (Logo Quiz)
                    </Typography>
                    <List>
                      {logoLeaderboard.length ? (
                        logoLeaderboard.map((item, index) => (
                          <ListItem key={item.username}>
                            <ListItemAvatar>
                              <Avatar>{index + 1}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${item.username}`}
                              secondary={`คะแนน: ${item.score}`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <Typography textAlign="center" color="text.secondary">
                          ยังไม่มีผู้เล่นทำคะแนน
                        </Typography>
                      )}
                    </List>
                  </Card>
                </Box>
              )}
            </Card>
          </Box>
        </Layout>
      </SnackbarProvider>
    </>
  );
};

export default AdminPage;
