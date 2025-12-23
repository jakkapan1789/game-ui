// import { Button, Box, Typography } from "@mui/material";

// const GridPiece = ({
//   index,
//   isRevealed,
//   imageSrc,
//   rows,
//   cols,
//   onReveal,
//   disabled,
// }) => {
//   const col = index % cols;
//   const row = Math.floor(index / cols);

//   const posX = (col / (cols - 1)) * 100 || 0;
//   const posY = (row / (rows - 1)) * 100 || 0;

//   const handleClick = () => {
//     if (!isRevealed && !disabled) {
//       onReveal(index);
//     }
//   };

//   return (
//     <Button
//       onClick={handleClick}
//       disabled={isRevealed || disabled}
//       sx={{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: "4px",
//         p: 0,
//         minWidth: 0,
//         height: "100%",
//         transition: "all 0.3s ease",
//         "&:hover": !isRevealed && {
//           transform: "translateY(-6px)",
//           boxShadow: "0 12px 20px rgba(0,0,0,0.4)",
//         },
//       }}
//     >
//       {/* ชิ้นส่วนภาพ */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `url(${imageSrc})`,
//           backgroundSize: `${cols * 100}% ${rows * 100}%`,
//           backgroundPosition: `${posX}% ${posY}%`,
//           backgroundRepeat: "no-repeat",
//           opacity: isRevealed ? 1 : 0,
//           transition: "opacity 0.6s ease-in-out",
//           borderRadius: "4px",
//         }}
//       />

//       {/* ฝาครอบแบบ Frosted Glass */}
//       {!isRevealed && (
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background: "rgba(255, 255, 255, 0.25)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.3)",
//             borderRadius: "4px",
//             boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "bold",
//               color: "white",
//               textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
//               fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.2rem" },
//             }}
//           >
//             {index + 1}
//           </Typography>
//         </Box>
//       )}
//     </Button>
//   );
// };

// export default GridPiece;
import { Box, Typography } from "@mui/material";

const GridPiece = ({
  index,
  isRevealed,
  imageSrc,
  rows,
  cols,
  onReveal,
  disabled,
}) => {
  const col = index % cols;
  const row = Math.floor(index / cols);

  const posX = (col / (cols - 1)) * 100 || 0;
  const posY = (row / (rows - 1)) * 100 || 0;

  const handleClick = () => {
    if (!isRevealed && !disabled) {
      onReveal(index);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        overflow: "hidden",
        cursor: disabled || isRevealed ? "default" : "pointer",
        borderRadius: "4px",
        willChange: "transform, opacity",
        transform: "translateZ(0)", // ⭐ force GPU
      }}
    >
      {/* ===== IMAGE PIECE ===== */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${posX}% ${posY}%`,
          backgroundRepeat: "no-repeat",
          opacity: isRevealed ? 1 : 0,
          transition: "opacity 0.35s ease",
          borderRadius: "4px",
        }}
      />

      {/* ===== COVER (OPTIMIZED) ===== */}
      {!isRevealed && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            // ❌ no backdropFilter
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.15))",

            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "4px",

            transition: "transform 0.2s ease, opacity 0.2s ease",

            "&:hover": !disabled && {
              transform: "scale(1.04)", // ⭐ ไม่ทำ layout shift
              opacity: 0.85,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "white",
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.4rem" },
              textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
              userSelect: "none",
            }}
          >
            {index + 1}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GridPiece;
