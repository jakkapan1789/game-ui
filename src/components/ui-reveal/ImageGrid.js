// import { useState, useEffect } from "react";
// import GridPiece from "./GridPiece";
// import { Box, Typography } from "@mui/material";

// // ========== ตั้งค่าที่นี่ ==========
// const ROWS = 8; // จำนวนแถว
// const COLS = 8; // จำนวนคอลัมน์
// // =====================================

// const GRID_SIZE = ROWS * COLS; // เช่น 50 ช่อง
// const MAX_SCORE_PER_ROUND = 200;
// const REVEAL_PENALTY = 20;

// const ImageGrid = ({ category }) => {
//   const [gameState, setGameState] = useState({
//     currentImage: null,
//     revealedPieces: Array(GRID_SIZE).fill(false),
//     score: MAX_SCORE_PER_ROUND,
//     totalScore: 0,
//     hintsUsed: 0,
//     guessAttempts: 0,
//     isGameWon: false,
//     isGameOver: false,
//   });

//   const [imageAspectRatio, setImageAspectRatio] = useState(`${COLS} / ${ROWS}`); // default fallback

//   useEffect(() => {
//     startGame(category);
//   }, [category]);

//   const startGame = (category) => {
//     const image = {
//       id: "Dog",
//       src: "/games/cat-panda.png",
//       answer: "dog wearing bunny ears",
//       hints: ["It's an animal", "Wearing bunny ears", "Cute golden retriever"],
//       category: "animals",
//     };

//     setGameState({
//       currentImage: image,
//       revealedPieces: Array(GRID_SIZE).fill(false),
//       score: MAX_SCORE_PER_ROUND,
//       totalScore: gameState.totalScore || 0,
//       hintsUsed: 0,
//       guessAttempts: 0,
//       isGameWon: false,
//       isGameOver: false,
//     });
//   };

//   // โหลดขนาดจริงของภาพเพื่อคำนวณ aspect ratio ที่ถูกต้อง
//   useEffect(() => {
//     if (gameState.currentImage) {
//       const img = new Image();
//       img.src = gameState.currentImage.src;
//       img.onload = () => {
//         // ใช้ขนาดจริงของภาพ ไม่ใช่ grid
//         setImageAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
//       };
//       img.onerror = () => {
//         setImageAspectRatio(`${COLS} / ${ROWS}`); // fallback
//       };
//     }
//   }, [gameState.currentImage]);

//   const revealPiece = (index) => {
//     if (
//       gameState.revealedPieces[index] ||
//       gameState.isGameWon ||
//       gameState.isGameOver
//     ) {
//       return;
//     }

//     setGameState((prev) => {
//       const newRevealed = [...prev.revealedPieces];
//       newRevealed[index] = true;
//       const newScore = Math.max(0, prev.score - REVEAL_PENALTY);
//       const allRevealed = newRevealed.every(Boolean);

//       return {
//         ...prev,
//         revealedPieces: newRevealed,
//         score: newScore,
//         isGameOver: allRevealed && !prev.isGameWon,
//       };
//     });
//   };

//   return (
//     <Box sx={{ py: 4 }}>
//       {gameState.currentImage ? (
//         <Box sx={{ textAlign: "center" }}>
//           <Typography variant="h4" gutterBottom>
//             เงินรางวัล: {gameState.score} บาท ({GRID_SIZE} ช่อง)
//           </Typography>

//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: `repeat(${COLS}, 1fr)`,
//               gridTemplateRows: `repeat(${ROWS}, 1fr)`,
//               gap: 0,
//               width: "100%",
//               maxWidth: "800px", // ปรับตามต้องการ (ใหญ่ขึ้นสำหรับช่องเยอะ)
//               margin: "0 auto",
//               aspectRatio: imageAspectRatio, // ตามขนาดภาพจริง → ต่อกันเป๊ะ
//               border: "1px solid #333",
//               overflow: "hidden",
//               boxShadow: 3,
//             }}
//           >
//             {gameState.revealedPieces.map((isRevealed, index) => (
//               <GridPiece
//                 key={index}
//                 index={index}
//                 isRevealed={isRevealed}
//                 imageSrc={gameState.currentImage.src}
//                 rows={ROWS}
//                 cols={COLS}
//                 onReveal={revealPiece}
//                 disabled={gameState.isGameWon || gameState.isGameOver}
//               />
//             ))}
//           </Box>
//         </Box>
//       ) : (
//         <Typography variant="h5" align="center">
//           Select a category to start the game!
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default ImageGrid;
import { useState, useEffect } from "react";
import GridPiece from "./GridPiece";
import { Box, Typography } from "@mui/material";

// ========== ตั้งค่าที่นี่ ==========
const ROWS = 10;
const COLS = 10;
// =====================================

const GRID_SIZE = ROWS * COLS;
const MAX_SCORE_PER_ROUND = 200;
const REVEAL_PENALTY = 20;

const ImageGrid = ({ category }) => {
  const [gameState, setGameState] = useState({
    currentImage: null,
    revealedPieces: Array(GRID_SIZE).fill(false),
    score: MAX_SCORE_PER_ROUND,
    totalScore: 0,
    hintsUsed: 0,
    guessAttempts: 0,
    isGameWon: false,
    isGameOver: false,
  });

  const [imageAspectRatio, setImageAspectRatio] = useState(`${COLS} / ${ROWS}`);

  useEffect(() => {
    startGame(category);
  }, [category]);

  const startGame = (category) => {
    const image = {
      id: "CatPanda",
      src: "/games/cute-panda.png",
      answer: "แมวแต่งตัวเป็นแพนด้า",
      hints: ["สัตว์น่ารัก", "แต่งตัวแฟนซี", "สีขาวดำ"],
      category: "animals",
    };

    setGameState({
      currentImage: image,
      revealedPieces: Array(GRID_SIZE).fill(false),
      score: MAX_SCORE_PER_ROUND,
      totalScore: gameState.totalScore || 0,
      hintsUsed: 0,
      guessAttempts: 0,
      isGameWon: false,
      isGameOver: false,
    });
  };

  useEffect(() => {
    if (gameState.currentImage) {
      const img = new Image();
      img.src = gameState.currentImage.src;
      img.onload = () => {
        setImageAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
      };
      img.onerror = () => {
        setImageAspectRatio(`${COLS} / ${ROWS}`);
      };
    }
  }, [gameState.currentImage]);

  const revealPiece = (index) => {
    if (
      gameState.revealedPieces[index] ||
      gameState.isGameWon ||
      gameState.isGameOver
    ) {
      return;
    }

    setGameState((prev) => {
      const newRevealed = [...prev.revealedPieces];
      newRevealed[index] = true;
      const newScore = Math.max(0, prev.score - REVEAL_PENALTY);
      const allRevealed = newRevealed.every(Boolean);

      return {
        ...prev,
        revealedPieces: newRevealed,
        score: newScore,
        isGameOver: allRevealed && !prev.isGameWon,
      };
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 6,
        px: 2,
      }}
    >
      {gameState.currentImage ? (
        <Box sx={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
              mb: 4,
            }}
          >
            เงินรางวัล: {gameState.score} บาท ({GRID_SIZE} ช่อง)
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              gap: "4px",
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              width: "100%",
              maxWidth: { xs: "95vw", sm: "80vw", md: "750px", lg: "850px" },
              aspectRatio: imageAspectRatio,
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            {gameState.revealedPieces.map((isRevealed, index) => (
              <GridPiece
                key={index}
                index={index}
                isRevealed={isRevealed}
                imageSrc={gameState.currentImage.src}
                rows={ROWS}
                cols={COLS}
                onReveal={revealPiece}
                disabled={gameState.isGameWon || gameState.isGameOver}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Typography variant="h5" color="white" align="center">
          เลือกหมวดหมู่เพื่อเริ่มเกม!
        </Typography>
      )}
    </Box>
  );
};

export default ImageGrid;
