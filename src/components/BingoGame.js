import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogContent,
} from "@mui/material";
import confetti from "canvas-confetti";

const fireConfigurations = [
  { ratio: 0.25, options: { spread: 26, startVelocity: 55 } },
  { ratio: 0.2, options: { spread: 60 } },
  { ratio: 0.35, options: { spread: 100, decay: 0.91, scalar: 0.8 } },
  {
    ratio: 0.1,
    options: { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
  },
  { ratio: 0.1, options: { spread: 120, startVelocity: 45 } },
];

const defaults = {
  origin: { y: 0.7 },
};

const BingoGame = ({ username, socket }) => {
  const [board, setBoard] = useState([]);
  const [marked, setMarked] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isAdmin] = useState(username === "Admin");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogEmoji, setDialogEmoji] = useState("");

  // 🔐 ป้องกันการกด Refresh หลังเกมเริ่มจับเลขแล้ว
  const [refreshLocked, setRefreshLocked] = useState(false);

  // ───────── Restore State ─────────
  useEffect(() => {
    const savedGameId = localStorage.getItem("bingo_game_id");
    const savedBoard = localStorage.getItem("bingo_board");
    const savedDrawn = localStorage.getItem("bingo_drawn");
    const savedMarked = localStorage.getItem("bingo_marked");

    if (savedGameId && savedBoard) {
      const parsedBoard = JSON.parse(savedBoard);
      const parsedDrawn = JSON.parse(savedDrawn || "[]");
      const parsedMarked = JSON.parse(savedMarked || "[]");

      setGameId(savedGameId);
      setBoard(parsedBoard);
      setDrawnNumbers(parsedDrawn);
      setMarked(parsedMarked);
      setGameStarted(true);

      setRefreshLocked(parsedDrawn.length > 0);

      // Auto check bingo
      setTimeout(() => checkBingo(parsedMarked, parsedDrawn), 300);
    }
  }, []);

  // ───────── Socket Events ─────────
  useEffect(() => {
    if (!socket) return;

    socket.on("gameStartedBingo", ({ game_id, board, drawnNumbers }) => {
      setDialogOpen(false);
      setGameId(game_id);
      setBoard(board);
      setDrawnNumbers(drawnNumbers || []);
      const autoMarked = ["FREE"];
      setMarked(autoMarked);
      setWinner(null);
      setGameStarted(true);

      setRefreshLocked(false); // เริ่มใหม่ → รีเฟรชได้

      localStorage.setItem("bingo_game_id", game_id);
      localStorage.setItem("bingo_board", JSON.stringify(board));
      localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers || []));
      localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));
    });

    socket.on("bingoNumber", ({ number, drawnNumbers }) => {
      setDrawnNumbers(drawnNumbers);
      localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));

      if (drawnNumbers.length > 0) setRefreshLocked(true);

      if (board.includes(number)) {
        setMarked((prev) => {
          const updated = [...new Set([...prev, number])];
          localStorage.setItem("bingo_marked", JSON.stringify(updated));
          checkBingo(updated, drawnNumbers);
          return updated;
        });
      } else {
        checkBingo(marked, drawnNumbers);
      }
    });

    socket.on("bingoWinner", ({ winner }) => {
      setWinner(winner);
      setGameStarted(false);

      localStorage.removeItem("bingo_game_id");
      localStorage.removeItem("bingo_board");
      localStorage.removeItem("bingo_drawn");
      localStorage.removeItem("bingo_marked");

      setDialogEmoji(winner === username ? "🏆" : "😅");
      setDialogMessage(
        winner === username
          ? "คุณชนะแล้ว!"
          : `เสียใจด้วย คุณแพ้แล้ว เพราะ ${winner} เป็นผู้ชนะ`
      );

      if (winner === username) fireConfetti();

      setDialogOpen(true);
    });

    // ⭐ รับบอร์ดใหม่จาก server
    socket.on("bingoBoardUpdated", ({ board }) => {
      setBoard(board);
      setMarked(["FREE"]);
      localStorage.setItem("bingo_board", JSON.stringify(board));
      localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
    });

    socket.on("bingoBoardDenied", () => {
      alert("ไม่สามารถขอการ์ดใหม่ได้ เพราะมีการจับเลขแล้ว!");
    });

    return () => {
      socket.off("gameStartedBingo");
      socket.off("bingoNumber");
      socket.off("bingoWinner");
      socket.off("bingoBoardUpdated");
      socket.off("bingoBoardDenied");
    };
  }, [socket, board, marked]);

  // ───────── Functions ─────────

  const requestNewBoard = () => {
    socket.emit("requestNewBingoBoard", { username });
  };

  const checkBingo = (newMarked, drawn) => {
    if (winner || !gameStarted || !board.length) return;

    const size = 5;
    const isHit = (num) =>
      newMarked.includes(num) || num === "FREE" || drawn.includes(num);
    const isBingo = (indices) => indices.every((i) => isHit(board[i]));

    for (let i = 0; i < size; i++) {
      const row = Array.from({ length: size }, (_, j) => i * size + j);
      const col = Array.from({ length: size }, (_, j) => j * size + i);
      if (isBingo(row) || isBingo(col)) return handleWin();
    }

    const diag1 = [0, 6, 12, 18, 24];
    const diag2 = [4, 8, 12, 16, 20];
    if (isBingo(diag1) || isBingo(diag2)) return handleWin();
  };

  const handleWin = () => {
    if (!winner) {
      socket.emit("bingoComplete", { username, game_id: gameId });
      setWinner(username);
      setGameStarted(false);

      localStorage.removeItem("bingo_game_id");
      localStorage.removeItem("bingo_board");
      localStorage.removeItem("bingo_drawn");
      localStorage.removeItem("bingo_marked");

      setDialogEmoji("🏆");
      setDialogMessage("คุณชนะแล้ว!");
      setDialogOpen(true);
    }
  };

  const handleMarkCell = (num) => {
    if (!gameStarted || winner) return;
    if (marked.includes(num)) return;

    const updated = [...new Set([...marked, num])];
    setMarked(updated);

    localStorage.setItem("bingo_marked", JSON.stringify(updated));

    checkBingo(updated, drawnNumbers);
  };

  const fireConfetti = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const delays = [300, 700, 4500];

    for (let i = 0; i < delays.length; i++) {
      fireConfigurations.forEach((config) => {
        fire(config.ratio, config.options);
      });
      if (i < delays.length - 1) await delay(delays[i]);
    }
  };

  const fire = (particleRatio, opts) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(200 * particleRatio),
      zIndex: 9999,
    });
  };

  // ───────── UI ─────────

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        px: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", maxWidth: 600, mb: 2 }}
      >
        <Typography variant="h6">🎯 Bingo Game</Typography>

        <Chip
          label={`ผู้เล่น: ${username}`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* ⭐ ปุ่มใหม่: ขอการ์ดใหม่ */}
      {!winner && gameStarted && (
        <Button
          variant="contained"
          color="error"
          disabled={refreshLocked}
          onClick={requestNewBoard}
          sx={{ mb: 2 }}
        >
          🔄 ขอการ์ดใหม่
        </Button>
      )}

      {!gameStarted && !winner && (
        <Typography variant="h6" color="text.secondary">
          🕹️ รอผู้ดูแลเริ่มเกม...
        </Typography>
      )}

      {gameStarted && (
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ maxWidth: 600 }}
        >
          {board.map((num, i) => (
            <Grid item xs={2.4} key={i}>
              <Card
                onClick={() => handleMarkCell(num)}
                sx={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderRadius: 1.5,
                  cursor: winner ? "not-allowed" : "pointer",
                  backgroundColor: marked.includes(num)
                    ? "#2563eb"
                    : drawnNumbers.includes(num)
                    ? "#c7d2fe"
                    : "#f8fafc",
                  color: marked.includes(num) ? "white" : "black",
                  transition: "all 0.2s ease",
                }}
              >
                {num === "FREE" ? "★" : num}
              </Card>
            </Grid>
          ))}

          <Typography variant="caption">Game Room:{gameId}</Typography>
        </Grid>
      )}

      <Dialog
        open={dialogOpen}
        maxWidth="xs"
        BackdropProps={{
          sx: {
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))",
            backdropFilter: "blur(15px)",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            p: 2,
            border: "none",
            borderRadius: 2,
          },
        }}
      >
        <DialogContent>
          <Typography variant="h1" align="center">
            {dialogEmoji}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: "1.6rem",
            }}
          >
            {dialogMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BingoGame;
