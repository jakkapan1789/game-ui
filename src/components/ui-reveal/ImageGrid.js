import { useState, useEffect } from "react";
import GridPiece from "./GridPiece";
import {
  Box,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
  Fade,
} from "@mui/material";

/* ================= CONFIG ================= */
const ROWS = 10;
const COLS = 10;
const GRID_SIZE = ROWS * COLS;
const MAX_SCORE_PER_ROUND = 200;
const REVEAL_PENALTY = 20;
/* ========================================= */

/* ===== IMAGE POOL ===== */
const IMAGE_POOL = [
  {
    id: "FoxChef",
    label: "🦊 Secret 1",
    src: "/games/cat-panda.png",
    category: "animals",
  },
  {
    id: "FoxChef2",
    label: "🦊 Secret 2",
    src: "/games/dog-rabbit.png",
    category: "animals",
  },
];

const ImageGrid = () => {
  const [selectedImageId, setSelectedImageId] = useState(IMAGE_POOL[0].id);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [gameState, setGameState] = useState({
    currentImage: null,
    revealedPieces: Array(GRID_SIZE).fill(false),
    score: MAX_SCORE_PER_ROUND,
    isGameOver: false,
  });

  /* ===== START GAME (SAFE) ===== */
  const startGameWithImage = (imageId) => {
    const image = IMAGE_POOL.find((i) => i.id === imageId);
    if (!image) return;

    // 1️⃣ ปิด grid ก่อน
    setIsTransitioning(true);

    // 2️⃣ clear state
    setGameState({
      currentImage: null,
      revealedPieces: Array(GRID_SIZE).fill(false),
      score: MAX_SCORE_PER_ROUND,
      isGameOver: false,
    });

    // 3️⃣ เปิดเกมใหม่หลัง frame นึง
    requestAnimationFrame(() => {
      setGameState({
        currentImage: image,
        revealedPieces: Array(GRID_SIZE).fill(false),
        score: MAX_SCORE_PER_ROUND,
        isGameOver: false,
      });
      setIsTransitioning(false);
    });
  };

  /* ===== INIT ===== */
  useEffect(() => {
    startGameWithImage(selectedImageId);
  }, []);

  /* ===== REVEAL SINGLE ===== */
  const revealPiece = (index) => {
    setGameState((prev) => {
      if (prev.revealedPieces[index] || prev.isGameOver) return prev;

      const revealed = [...prev.revealedPieces];
      revealed[index] = true;

      const score = Math.max(0, prev.score - REVEAL_PENALTY);
      const done = revealed.every(Boolean);

      return {
        ...prev,
        revealedPieces: revealed,
        score,
        isGameOver: done,
      };
    });
  };

  /* ===== REVEAL ALL ===== */
  const revealAll = () => {
    setGameState((prev) => ({
      ...prev,
      revealedPieces: Array(GRID_SIZE).fill(true),
      isGameOver: true,
    }));
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        background: "#222222ff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ pt: 2, px: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          💰 เงินรางวัล: {gameState.score} บาท
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          {/* ===== DROPDOWN ===== */}
          <Select
            size="small"
            value={selectedImageId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedImageId(id);
              startGameWithImage(id);
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              minWidth: 140,
            }}
          >
            {IMAGE_POOL.map((img) => (
              <MenuItem key={img.id} value={img.id}>
                {img.label}
              </MenuItem>
            ))}
          </Select>

          <Button
            size="small"
            variant="contained"
            onClick={revealAll}
            sx={{ bgcolor: "red", borderRadius: 3 }}
          >
            เฉลย
          </Button>
        </Stack>
      </Box>

      {/* ===== GRID AREA ===== */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0.5,
          position: "relative",
          m: 3,
        }}
      >
        {/* ===== GRID ===== */}
        {gameState.currentImage && !isTransitioning && (
          <Fade in timeout={200}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                maxWidth: "min(96vw, 96vh)",
                maxHeight: "min(96vw, 96vh)",
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                gap: "2px",
                bgcolor: "rgba(255,255,255,0.2)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {gameState.revealedPieces.map((open, i) => (
                <GridPiece
                  key={i}
                  index={i}
                  isRevealed={open}
                  imageSrc={gameState.currentImage.src}
                  rows={ROWS}
                  cols={COLS}
                  onReveal={revealPiece}
                  disabled={gameState.isGameOver}
                />
              ))}
            </Box>
          </Fade>
        )}

        {/* ===== OVERLAY (กันภาพแว้บ) ===== */}
        {isTransitioning && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "#222222ff",
              zIndex: 10,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ImageGrid;
