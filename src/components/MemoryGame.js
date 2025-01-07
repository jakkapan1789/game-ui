import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
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
  const [gameComplete, setGameComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogEmoji, setDialogEmoji] = useState("");
  const initializeGame = (gameState) => {
    setCards(gameState.cards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };

  useEffect(() => {
    socket.on("gameStartedMemory", (gameState) => {
      initializeGame(gameState);
      setDialogOpen(false);
    });

    socket.on("gameCompletedMemory", ({ winner }) => {
      setGameComplete(true);

      if (username === winner) {
        setDialogEmoji("🥳");
        setDialogMessage(`ขอแสดงความยินดี!คุณชนะแล้ว!`);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        (async () => {
          const delays = [300, 700, 4500];
          for (let i = 0; i < delays.length; i++) {
            fireConfigurations.forEach((config) => {
              fire(config.ratio, config.options);
            });
            if (i < delays.length - 1) {
              await delay(delays[i]);
            }
          }
        })();
      } else {
        setDialogEmoji("😢");
        setDialogMessage(`เสียใจด้วยคุณแพ้แล้ว`);
      }

      setDialogOpen(true);
    });

    return () => {
      socket.off("gameStartedMemory");
      socket.off("gameCompletedMemory");
    };
  }, []);

  const fire = (particleRatio, opts) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(200 * particleRatio),
      zIndex: 9999,
    });
  };

  const handleCardClick = (id) => {
    if (isChecking || flippedCards.includes(id) || cards[id].isMatched) return;

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
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card) => (
          <Grid item xs={3} sm={3} md={2} key={card.id}>
            <Card
              sx={{
                p: 2,
                aspectRatio: "1",
                backgroundColor:
                  card.isFlipped || card.isMatched ? "#fff" : "#ddd",
                boxShadow:
                  card.isFlipped || card.isMatched
                    ? "0px 4px 10px rgba(0,0,0,0.2)"
                    : "none",
                transformStyle: "preserve-3d",
                transition: "transform 0.5s",
                transform:
                  flippedCards.includes(card.id) || card.isMatched
                    ? "rotateY(180deg)"
                    : "",
              }}
              onClick={() => handleCardClick(card.id)}
            >
              {card.isFlipped || card.isMatched ? (
                <CardMedia
                  component="img"
                  image={card.emoji}
                  alt="Card Emoji"
                />
              ) : (
                <CardMedia
                  component="img"
                  image="/images/question.png"
                  alt="Card Back"
                />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
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

export default MemoryGame;
