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

//   // คำนวณตำแหน่งที่ถูกต้อง 100% (สูตรสำคัญ)
//   const posX = (col / (cols - 1)) * 100 || 0; // ป้องกัน divide by zero ถ้า cols=1
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
//         p: 0,
//         minWidth: 0,
//         borderRadius: 0,
//         "&:hover": { backgroundColor: "transparent" },
//       }}
//     >
//       {/* ชิ้นส่วนภาพ */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `url(${imageSrc})`,
//           backgroundSize: `${cols * 100}% ${rows * 100}%`, // เช่น 1000% 500% สำหรับ 10x5
//           backgroundPosition: `${posX}% ${posY}%`,
//           backgroundRepeat: "no-repeat",
//           opacity: isRevealed ? 1 : 0,
//           transition: "opacity 0.4s ease-in-out",
//         }}
//       />

//       {/* ฝาครอบเลข */}
//       {!isRevealed && (
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "background.paper",
//             border: "solid 1px gray",
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold" color="text.primary">
//             {index + 1}
//           </Typography>
//         </Box>
//       )}
//     </Button>
//   );
// };

// export default GridPiece;
import { Button, Box, Typography } from "@mui/material";

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
    <Button
      onClick={handleClick}
      disabled={isRevealed || disabled}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        p: 0,
        minWidth: 0,
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": !isRevealed && {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.4)",
        },
      }}
    >
      {/* ชิ้นส่วนภาพ */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${posX}% ${posY}%`,
          backgroundRepeat: "no-repeat",
          opacity: isRevealed ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
          borderRadius: "4px",
        }}
      />

      {/* ฝาครอบแบบ Frosted Glass */}
      {!isRevealed && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "4px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
              fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.2rem" },
            }}
          >
            {index + 1}
          </Typography>
        </Box>
      )}
    </Button>
  );
};

export default GridPiece;
