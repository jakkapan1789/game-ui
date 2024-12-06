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
} from "@mui/material";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);

const QuestionGame = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [question, setQuestion] = useState("คำถาม");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

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
    <>
      {isGameActive ? (
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Stack direction={"column"} spacing={2}>
                <Typography variant="body1" fontWeight={"bold"}>
                  ตอบคำถามชิงเงินรางวัล
                </Typography>
                <Divider />
                <Typography variant="body1">{question}</Typography>
                <TextField
                  sx={{ mt: 2 }}
                  label="คำตอบ"
                  fullWidth
                  size="small"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
              ></Typography>
              <List>
                {answers.length > 0 ? (
                  answers.map((answer, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        mb: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: "primary.main", color: "white" }}
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold">
                            ชื่อ: {answer.username}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body" color="text.secondary">
                            คำตอบ: {answer.answer}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    ยังไม่ได้รับคำตอบ.
                  </Typography>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default QuestionGame;
