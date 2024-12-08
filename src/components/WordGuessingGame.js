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
  Box,
} from "@mui/material";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);

const WordGuessingGame = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [question, setQuestion] = useState("เอาไว้ใช้ทำอาหาร ตั้งบนเตาแก๊ส");
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
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Stack direction={"column"} spacing={2}>
              <Typography variant="body1" fontWeight={"bold"}>
                เกมส์ทายคำ
              </Typography>
              <Divider />
              <Typography variant="body1">{question}</Typography>

              <Box display="flex" gap={1} justifyContent="center">
                {["ก", "_", "_", "ท", ""].map((val, index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    value={val || ""}
                    // onChange={(e) => handleInput(index, e.target.value)}
                    // onKeyDown={(e) => handleKeyDown(index, e)}
                    // onPaste={handlePaste}
                    // inputRef={(el) => (inputRefs.current[index] = el)}
                    sx={{
                      "& .MuiOutlinedInput-root": { width: 40, height: 40 },
                    }}
                  />
                ))}
              </Box>
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
    </>
  );
};
export default WordGuessingGame;
