import React, { useState, useEffect } from "react";
import { Grid, Box, Card, CardMedia, Typography, Stack } from "@mui/material";
import { io } from "socket.io-client";
import confetti from "canvas-confetti";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);

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

const MemoryGame = ({ username }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogEmoji, setDialogEmoji] = useState("");

  const initializeGame = (gameState) => {
    setCards(gameState.cards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setGameStarted(true);
  };

  useEffect(() => {
    socket.on("gameStartedMemory", (gameState) => {
      console.log("gameState", gameState);
      initializeGame(gameState);
      setDialogOpen(false);
    });

    socket.on("gameCompletedMemory", ({ winner }) => {
      setGameComplete(true);

      if (username === winner) {
        setDialogEmoji("🥳");
        setDialogMessage("ขอแสดงความยินดี! คุณชนะแล้ว!");
        fireConfetti();
      } else {
        setDialogEmoji("😢");
        setDialogMessage("เสียใจด้วย คุณแพ้แล้ว");
      }

      setDialogOpen(true);
    });

    return () => {
      socket.off("gameStartedMemory");
      socket.off("gameCompletedMemory");
    };
  }, []);

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

  // const handleCardClick = (id) => {
  //   if (isChecking || flippedCards.includes(id) || cards[id].isMatched) return;
  const handleCardClick = (id) => {
    if (
      gameComplete || // ⭐ เพิ่มบรรทัดนี้
      isChecking ||
      flippedCards.includes(id) ||
      cards[id].isMatched
    )
      return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const [firstCard, secondCard] = newFlippedCards;
      if (updatedCards[firstCard].emoji === updatedCards[secondCard].emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);

        const allMatched = updatedCards.every(
          (card) => card.isMatched || newFlippedCards.includes(card.id)
        );

        if (allMatched) {
          setGameComplete(true);
          socket.emit("gameCompleteMemory", username);
        }
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              newFlippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        px: 2,
        bgcolor: "background.default",
      }}
    >
      {!gameStarted && (
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 0,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            เกมส์จับคู่ภาพ
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            🕹️ รอผู้ดูแลเริ่มเกม
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            เมื่อผู้ดูแลเริ่มเกม หน้านี้จะโหลดอัตโนมัติ
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            🕹️ วิธีการเล่น
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, textAlign: "justify" }}
          >
            การแข่งขันทดสอบความจำให้จับคู่ภาพที่เหมือนกัน
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, textAlign: "justify" }}
          >
            ถ้าจับคู่ภาพที่ตรงกันจะสามารถกดจับคู่ต่อไปได้ทันที
            แต่ถ้าผิดจะต้องรอภาพหมุนกลับมาก่อน
          </Typography>
        </Stack>
      )}

      {dialogOpen && (
        <Box
          sx={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h1">{dialogEmoji}</Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: dialogEmoji === "🥳" ? "success.main" : "error.main",
            }}
          >
            {dialogMessage}
          </Typography>
        </Box>
      )}

      {gameStarted && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            maxWidth: 600,
            overflow: "hidden",
          }}
        >
          {cards.map((card) => (
            <Grid item xs={3} sm={3} md={2} key={card.id}>
              <Card
                sx={{
                  p: 1,
                  aspectRatio: "1",
                  backgroundColor:
                    card.isFlipped || card.isMatched ? "#fff" : "#dbeafe",
                  boxShadow:
                    card.isFlipped || card.isMatched
                      ? "0px 4px 10px rgba(0,0,0,0.2)"
                      : "none",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  transform:
                    flippedCards.includes(card.id) || card.isMatched
                      ? "rotateY(180deg)"
                      : "",
                }}
                onClick={() => handleCardClick(card.id)}
              >
                <CardMedia
                  component="img"
                  image={
                    card.isFlipped || card.isMatched
                      ? card.emoji
                      : "/images/question.png"
                  }
                  alt="Card"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MemoryGame;
