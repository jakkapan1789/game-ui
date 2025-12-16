import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  Stack,
  TextField,
  ListItem,
  Card,
  Grid,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);

const QuestionGame = ({ username }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [question, setQuestion] = useState("คำถาม");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    socket.on("gameStarted", (question) => {
      setQuestion(question);
      setIsGameActive(true);
      setAnswers([]);
    });

    socket.on("answerReceived", (data) => {
      setAnswers((prev) => [...prev, data]);
    });

    return () => {
      socket.off("gameStarted");
      socket.off("answerReceived");
    };
  }, []);

  const handleSubmitAnswer = () => {
    socket.emit("submitAnswer", { username: username, answer });
    setAnswer("");
    setIsGameActive(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)", // พอดีหน้าจอ ลบความสูง Header
        width: "100%",
        overflow: "hidden", // ✅ ป้องกัน scroll
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Toolbar /> {/* Spacer */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100%", // ✅ เต็มความสูงที่เหลือ
          overflow: "hidden",
        }}
      >
        <Grid item xs={12} sm={10} md={6} lg={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
              maxHeight: "90vh", // ป้องกันยืดเกิน
              overflow: "hidden",
            }}
          >
            {isGameActive ? (
              <Stack direction="column" spacing={2}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textAlign="center"
                  color="text.primary"
                >
                  ตอบคำถามชิงเงินรางวัล
                </Typography>
                <Divider />
                <Typography
                  variant="body1"
                  textAlign="center"
                  sx={{
                    wordBreak: "break-word",
                    userSelect: "none",
                    cursor: "not-allowed",
                  }}
                >
                  {question}
                </Typography>
                <TextField
                  sx={{ mt: 2 }}
                  label="คำตอบ"
                  fullWidth
                  size="small"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                />
                <Button
                  onClick={handleSubmitAnswer}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundImage:
                      "linear-gradient(to right, #1e3a8a, #3b82f6)",
                  }}
                >
                  ตอบคำถาม
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  เกมส์ตอบคำถาม
                </Typography>
                <List
                  sx={{
                    overflowY: answers.length > 3 ? "auto" : "hidden", // ✅ Scroll เฉพาะเมื่อจำเป็น
                    maxHeight: "60vh",
                  }}
                >
                  {answers.length > 0 ? (
                    answers.map((answer, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              backgroundImage:
                                "linear-gradient(to right, #1e3a8a, #3b82f6)",
                              color: "white",
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={answer.username}
                          secondary={answer.answer}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      textAlign="center"
                    >
                      ยังไม่ได้รับคำตอบ.
                    </Typography>
                  )}
                </List>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionGame;
