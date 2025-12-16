// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   Button,
//   Stack,
//   Chip,
//   Dialog,
//   DialogContent,
//   Drawer,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import confetti from "canvas-confetti";
// import { useSnackbar } from "notistack";
// import CloseIcon from "@mui/icons-material/Close";

// const fireConfigurations = [
//   { ratio: 0.25, options: { spread: 26, startVelocity: 55 } },
//   { ratio: 0.2, options: { spread: 60 } },
//   { ratio: 0.35, options: { spread: 100, decay: 0.91, scalar: 0.8 } },
//   {
//     ratio: 0.1,
//     options: { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
//   },
//   { ratio: 0.1, options: { spread: 120, startVelocity: 45 } },
// ];

// const defaults = { origin: { y: 0.7 } };

// const BingoGame = ({ username, socket }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   // ─────────────────────────
//   // ⭐ Access control (NEW)
//   // ─────────────────────────
//   const [syncChecked, setSyncChecked] = useState(false);
//   const [lockedOut, setLockedOut] = useState(false);

//   // ─────────────────────────
//   // Game state
//   // ─────────────────────────
//   const [board, setBoard] = useState([]);
//   const [marked, setMarked] = useState([]);
//   const [drawnNumbers, setDrawnNumbers] = useState([]);
//   const [winner, setWinner] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [gameId, setGameId] = useState(null);

//   // ─────────────────────────
//   // UI state
//   // ─────────────────────────
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [dialogEmoji, setDialogEmoji] = useState("");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // ─────────────────────────
//   // Utils
//   // ─────────────────────────
//   const calculateMarked = (board, drawn) => [
//     "FREE",
//     ...board.filter((n) => drawn.includes(n)),
//   ];

//   // ⭐ ขอการ์ดใหม่
//   const requestNewBoard = () => {
//     if (!socket) return;
//     socket.emit("requestNewBingoBoard", { username });
//   };

//   // ─────────────────────────
//   // ⭐ STEP 1: ขอ sync จาก server (NEW)
//   // ─────────────────────────
//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("syncBingoState", { username });
//   }, [socket, username]);

//   // ─────────────────────────
//   // ⭐ STEP 2: รับผล sync (NEW)
//   // ─────────────────────────
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("bingoSyncResult", (data) => {
//       setSyncChecked(true);

//       // ✅ room เดิม / refresh
//       if (data.status === "SYNC") {
//         setLockedOut(false);

//         const { game_id, board, drawnNumbers } = data;
//         const autoMarked = calculateMarked(board, drawnNumbers);

//         setGameId(game_id);
//         setBoard(board);
//         setDrawnNumbers(drawnNumbers);
//         setMarked(autoMarked);
//         setGameStarted(true);

//         localStorage.setItem("bingo_game_id", game_id);
//         localStorage.setItem("bingo_board", JSON.stringify(board));
//         localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));
//         localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));
//         return;
//       }

//       // ❌ เกมเริ่มไปแล้ว / room ไม่ตรง
//       if (data.status === "GAME_IN_PROGRESS") {
//         setLockedOut(true);
//         setGameStarted(false);
//         return;
//       }

//       // ⏳ ยังไม่มีเกม
//       if (data.status === "NO_GAME") {
//         setLockedOut(false);
//         setGameStarted(false);
//       }
//     });

//     return () => socket.off("bingoSyncResult");
//   }, [socket]);

//   // ─────────────────────────
//   // Runtime socket events (เดิม)
//   // ─────────────────────────
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("gameStartedBingo", ({ game_id, board, drawnNumbers }) => {
//       setDialogOpen(false);
//       setLockedOut(false);
//       setSyncChecked(true);

//       setGameId(game_id);
//       setBoard(board);
//       setDrawnNumbers(drawnNumbers || []);
//       setMarked(["FREE"]);
//       setWinner(null);
//       setGameStarted(true);

//       localStorage.setItem("bingo_game_id", game_id);
//       localStorage.setItem("bingo_board", JSON.stringify(board));
//       localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers || []));
//       localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
//     });

//     socket.on("bingoBoardUpdated", ({ board }) => {
//       setBoard(board);
//       setMarked(["FREE"]);
//       localStorage.setItem("bingo_board", JSON.stringify(board));
//       localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
//     });

//     socket.on("bingoBoardDenied", () => {
//       alert("ไม่สามารถขอการ์ดใหม่ได้ เพราะมีการจับเลขแล้ว!");
//     });

//     socket.on("bingoNumber", ({ number, drawnNumbers }) => {
//       setDrawnNumbers(drawnNumbers);

//       const autoMarked = calculateMarked(board, drawnNumbers);
//       setMarked(autoMarked);

//       localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));
//       localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));

//       enqueueSnackbar(`🎲 เลขที่ออก: ${number}`, {
//         variant: board.includes(number) ? "success" : "info",
//       });

//       // ตรวจสอบบิงโกเมื่อมีเลขออกใหม่
//       checkBingo(autoMarked, drawnNumbers);
//     });

//     socket.on("bingoWinner", ({ winner }) => {
//       setWinner(winner);
//       setGameStarted(false);

//       setDialogEmoji(winner === username ? "🏆" : "😅");
//       setDialogMessage(
//         winner === username
//           ? "คุณชนะแล้ว!"
//           : `เสียใจด้วย คุณแพ้แล้ว เพราะ ${winner} เป็นผู้ชนะ`
//       );

//       if (winner === username) fireConfetti();
//       setDialogOpen(true);
//     });

//     return () => {
//       socket.off("gameStartedBingo");
//       socket.off("bingoNumber");
//       socket.off("bingoWinner");
//     };
//   }, [socket, board, username, enqueueSnackbar]);

//   // ─────────────────────────
//   // ฟังก์ชันตรวจสอบบิงโก
//   // ─────────────────────────
//   const checkBingo = (newMarked, drawn) => {
//     if (winner || !gameStarted || !board.length) return;

//     const size = 5; // ขนาดของบอร์ดบิงโก
//     const isHit = (num) =>
//       newMarked.includes(num) || num === "FREE" || drawn.includes(num);
//     const isBingo = (indices) => indices.every((i) => isHit(board[i]));

//     // ตรวจสอบแถวและคอลัมน์
//     for (let i = 0; i < size; i++) {
//       const row = Array.from({ length: size }, (_, j) => i * size + j);
//       const col = Array.from({ length: size }, (_, j) => j * size + i);
//       if (isBingo(row) || isBingo(col)) return handleWin();
//     }

//     // ตรวจสอบแนวทแยง
//     const diag1 = [0, 6, 12, 18, 24];
//     const diag2 = [4, 8, 12, 16, 20];
//     if (isBingo(diag1) || isBingo(diag2)) return handleWin();
//   };

//   const handleWin = () => {
//     if (!winner) {
//       socket.emit("bingoComplete", { username, game_id: gameId });
//       setWinner(username);
//       setGameStarted(false);

//       localStorage.removeItem("bingo_game_id");
//       localStorage.removeItem("bingo_board");
//       localStorage.removeItem("bingo_drawn");
//       localStorage.removeItem("bingo_marked");

//       setDialogEmoji("🏆");
//       setDialogMessage("คุณชนะแล้ว!");
//       setDialogOpen(true);
//     }
//   };

//   // ─────────────────────────
//   // Confetti
//   // ─────────────────────────
//   const fireConfetti = async () => {
//     fireConfigurations.forEach((config) => {
//       confetti({
//         ...defaults,
//         ...config.options,
//         particleCount: Math.floor(200 * config.ratio),
//         zIndex: 9999,
//       });
//     });
//   };

//   // ─────────────────────────
//   // ⭐ Guard UI (NEW, ไม่แตะ layout)
//   // ─────────────────────────
//   if (!syncChecked) return null;

//   if (lockedOut) {
//     return (
//       <Box
//         sx={{
//           height: "calc(100vh - 64px)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h6" color="error">
//           🚫 เกมนี้เริ่มไปแล้ว กรุณารอรอบถัดไป
//         </Typography>
//       </Box>
//     );
//   }

//   // ─────────────────────────
//   // UI (เหมือนเดิมทุกจุด)
//   // ─────────────────────────
//   return (
//     <Box
//       sx={{
//         height: "calc(100vh - 64px)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         overflow: "hidden",
//         px: 2,
//       }}
//     >
//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             height: "55vh",
//             borderTopLeftRadius: 16,
//             borderTopRightRadius: 16,
//             p: 2,
//           },
//         }}
//       >
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mb: 1 }}
//         >
//           <Typography variant="h6">🎲 เลขที่ออกแล้ว</Typography>

//           <IconButton fontSize="small" onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Stack>
//         <Divider sx={{ mb: 2 }} />

//         {drawnNumbers.length === 0 ? (
//           <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
//             ยังไม่มีการออกเลข
//           </Typography>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 1,
//               overflowY: "auto",
//               maxHeight: "100%",
//               pt: 1,
//             }}
//           >
//             {drawnNumbers.map((n) => (
//               <Chip
//                 key={n}
//                 label={n}
//                 color={board.includes(n) ? "primary" : "default"}
//                 variant={board.includes(n) ? "filled" : "outlined"}
//                 sx={{
//                   fontWeight: board.includes(n) ? "bold" : "normal",
//                   minWidth: 48, // ⭐ ความกว้างคงที่
//                   height: 32, // ⭐ ความสูงคงที่
//                   borderRadius: 16, // ⭐ กลมเท่ากัน
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               />
//             ))}
//           </Box>
//         )}
//       </Drawer>

//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         sx={{ width: "100%", maxWidth: 600, mb: 2 }}
//       >
//         <Typography variant="h6">🎯 เกมบิงโก</Typography>

//         <Chip
//           label={`🎲 เลขที่ออก (${drawnNumbers.length})`}
//           clickable
//           onClick={() => setDrawerOpen(true)}
//         />
//       </Stack>
//       {/* ⭐ ปุ่มขอการ์ดใหม่ (เอากลับมา) */}
//       {syncChecked && gameStarted && !winner && (
//         <Button
//           variant="contained"
//           color="error"
//           onClick={requestNewBoard}
//           disabled={drawnNumbers.length > 0} // ⭐ disable เมื่อมีเลขออกแล้ว
//           sx={{ mb: 2 }}
//         >
//           🔄 รีเฟรสตัวเลข
//         </Button>
//       )}

//       {!gameStarted && (
//         <Typography variant="h6" color="text.secondary">
//           🕹️ รอผู้ดูแลเริ่มเกม...
//         </Typography>
//       )}

//       {gameStarted && (
//         <Grid
//           container
//           spacing={1}
//           justifyContent="center"
//           sx={{ maxWidth: 600 }}
//         >
//           {board.map((num, i) => (
//             <Grid item xs={2.4} key={i}>
//               <Card
//                 sx={{
//                   aspectRatio: "1",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: "bold",
//                   fontSize: "1.2rem",
//                   borderRadius: 1.5,
//                   backgroundColor: marked.includes(num)
//                     ? "#2563eb"
//                     : drawnNumbers.includes(num)
//                     ? "#c7d2fe"
//                     : "#f8fafc",
//                   color: marked.includes(num) ? "white" : "black",
//                 }}
//               >
//                 {num === "FREE" ? "★" : num}
//               </Card>
//             </Grid>
//           ))}
//           <Typography variant="caption">Game Room: {gameId}</Typography>
//         </Grid>
//       )}

//       <Dialog open={dialogOpen} maxWidth="xs">
//         <DialogContent>
//           <Typography variant="h1" align="center">
//             {dialogEmoji}
//           </Typography>
//           <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
//             {dialogMessage}
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default BingoGame;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   Button,
//   Stack,
//   Chip,
//   Drawer,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import confetti from "canvas-confetti";
// import { useSnackbar } from "notistack";
// import CloseIcon from "@mui/icons-material/Close";

// const fireConfigurations = [
//   { ratio: 0.25, options: { spread: 26, startVelocity: 55 } },
//   { ratio: 0.2, options: { spread: 60 } },
//   { ratio: 0.35, options: { spread: 100, decay: 0.91, scalar: 0.8 } },
//   {
//     ratio: 0.1,
//     options: { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
//   },
//   { ratio: 0.1, options: { spread: 120, startVelocity: 45 } },
// ];

// const defaults = { origin: { y: 0.7 } };

// const BingoGame = ({ username, socket }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   // ─────────────────────────
//   // ⭐ Access control (NEW)
//   // ─────────────────────────
//   const [syncChecked, setSyncChecked] = useState(false);
//   const [lockedOut, setLockedOut] = useState(false);

//   // ─────────────────────────
//   // Game state
//   // ─────────────────────────
//   const [board, setBoard] = useState([]);
//   const [marked, setMarked] = useState([]);
//   const [drawnNumbers, setDrawnNumbers] = useState([]);
//   const [winner, setWinner] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [gameId, setGameId] = useState(null);

//   // ─────────────────────────
//   // UI state
//   // ─────────────────────────
//   const [resultMessage, setResultMessage] = useState(""); // ข้อความผลลัพธ์
//   const [dialogEmoji, setDialogEmoji] = useState("");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // ─────────────────────────
//   // Utils
//   // ─────────────────────────
//   const calculateMarked = (board, drawn) => [
//     "FREE",
//     ...board.filter((n) => drawn.includes(n)),
//   ];

//   // ⭐ ขอการ์ดใหม่
//   const requestNewBoard = () => {
//     if (!socket) return;
//     socket.emit("requestNewBingoBoard", { username });
//   };

//   // ─────────────────────────
//   // ⭐ STEP 1: ขอ sync จาก server (NEW)
//   // ─────────────────────────
//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("syncBingoState", { username });
//   }, [socket, username]);

//   // ─────────────────────────
//   // ⭐ STEP 2: รับผล sync (NEW)
//   // ─────────────────────────
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("bingoSyncResult", (data) => {
//       setSyncChecked(true);

//       // ✅ room เดิม / refresh
//       if (data.status === "SYNC") {
//         setLockedOut(false);

//         const { game_id, board, drawnNumbers } = data;
//         const autoMarked = calculateMarked(board, drawnNumbers);

//         setGameId(game_id);
//         setBoard(board);
//         setDrawnNumbers(drawnNumbers);
//         setMarked(autoMarked);
//         setGameStarted(true);

//         localStorage.setItem("bingo_game_id", game_id);
//         localStorage.setItem("bingo_board", JSON.stringify(board));
//         localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));
//         localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));
//         return;
//       }

//       // ❌ เกมเริ่มไปแล้ว / room ไม่ตรง
//       if (data.status === "GAME_IN_PROGRESS") {
//         setLockedOut(true);
//         setGameStarted(false);
//         return;
//       }

//       // ⏳ ยังไม่มีเกม
//       if (data.status === "NO_GAME") {
//         setLockedOut(false);
//         setGameStarted(false);
//       }
//     });

//     return () => socket.off("bingoSyncResult");
//   }, [socket]);

//   // ─────────────────────────
//   // Runtime socket events (เดิม)
//   // ─────────────────────────
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("gameStartedBingo", ({ game_id, board, drawnNumbers }) => {
//       setLockedOut(false);
//       setSyncChecked(true);

//       setGameId(game_id);
//       setBoard(board);
//       setDrawnNumbers(drawnNumbers || []);
//       setMarked(["FREE"]);
//       setWinner(null);
//       setGameStarted(true);
//       setResultMessage(""); // เคลียร์ข้อความผลลัพธ์

//       localStorage.setItem("bingo_game_id", game_id);
//       localStorage.setItem("bingo_board", JSON.stringify(board));
//       localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers || []));
//       localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
//     });

//     socket.on("bingoBoardUpdated", ({ board }) => {
//       setBoard(board);
//       setMarked(["FREE"]);
//       localStorage.setItem("bingo_board", JSON.stringify(board));
//       localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
//     });

//     socket.on("bingoBoardDenied", () => {
//       alert("ไม่สามารถขอการ์ดใหม่ได้ เพราะมีการจับเลขแล้ว!");
//     });

//     socket.on("bingoNumber", ({ number, drawnNumbers }) => {
//       setDrawnNumbers(drawnNumbers);

//       const autoMarked = calculateMarked(board, drawnNumbers);
//       setMarked(autoMarked);

//       localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));
//       localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));

//       enqueueSnackbar(`🎲 เลขที่ออก: ${number}`, {
//         variant: board.includes(number) ? "success" : "info",
//       });

//       // ตรวจสอบบิงโกเมื่อมีเลขออกใหม่
//       checkBingo(autoMarked, drawnNumbers);
//     });

//     socket.on("bingoWinner", ({ winner }) => {
//       setWinner(winner);
//       setGameStarted(false);

//       setDialogEmoji(winner === username ? "🏆" : "😅");
//       setResultMessage(
//         winner === username
//           ? "คุณชนะแล้ว!"
//           : `เสียใจด้วย คุณแพ้แล้ว เพราะ ${winner} เป็นผู้ชนะ`
//       );

//       if (winner === username) fireConfetti();
//     });

//     return () => {
//       socket.off("gameStartedBingo");
//       socket.off("bingoNumber");
//       socket.off("bingoWinner");
//     };
//   }, [socket, board, username, enqueueSnackbar]);

//   // ─────────────────────────
//   // ฟังก์ชันตรวจสอบบิงโก
//   // ─────────────────────────
//   const checkBingo = (newMarked, drawn) => {
//     if (winner || !gameStarted || !board.length) return;

//     const size = 5; // ขนาดของบอร์ดบิงโก
//     const isHit = (num) =>
//       newMarked.includes(num) || num === "FREE" || drawn.includes(num);
//     const isBingo = (indices) => indices.every((i) => isHit(board[i]));

//     // ตรวจสอบแถวและคอลัมน์
//     for (let i = 0; i < size; i++) {
//       const row = Array.from({ length: size }, (_, j) => i * size + j);
//       const col = Array.from({ length: size }, (_, j) => j * size + i);
//       if (isBingo(row) || isBingo(col)) return handleWin();
//     }

//     // ตรวจสอบแนวทแยง
//     const diag1 = [0, 6, 12, 18, 24];
//     const diag2 = [4, 8, 12, 16, 20];
//     if (isBingo(diag1) || isBingo(diag2)) return handleWin();
//   };

//   const handleWin = () => {
//     if (!winner) {
//       socket.emit("bingoComplete", { username, game_id: gameId });
//       setWinner(username);
//       setGameStarted(false);

//       localStorage.removeItem("bingo_game_id");
//       localStorage.removeItem("bingo_board");
//       localStorage.removeItem("bingo_drawn");
//       localStorage.removeItem("bingo_marked");

//       setDialogEmoji("🏆");
//       setResultMessage("คุณชนะแล้ว!");
//     }
//   };

//   // ─────────────────────────
//   // Confetti
//   // ─────────────────────────
//   const fireConfetti = async () => {
//     fireConfigurations.forEach((config) => {
//       confetti({
//         ...defaults,
//         ...config.options,
//         particleCount: Math.floor(200 * config.ratio),
//         zIndex: 9999,
//       });
//     });
//   };

//   // ─────────────────────────
//   // ⭐ Guard UI (NEW, ไม่แตะ layout)
//   // ─────────────────────────
//   if (!syncChecked) return null;

//   if (lockedOut) {
//     return (
//       <Box
//         sx={{
//           height: "calc(100vh - 64px)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h6" color="error">
//           🚫 เกมนี้เริ่มไปแล้ว กรุณารอรอบถัดไป
//         </Typography>
//       </Box>
//     );
//   }

//   // ─────────────────────────
//   // UI (เหมือนเดิมทุกจุด)
//   // ─────────────────────────
//   return (
//     <Box
//       sx={{
//         height: "calc(100vh - 64px)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         overflow: "hidden",
//         px: 2,
//       }}
//     >
//       {/* แสดงข้อความผลลัพธ์ที่ด้านบน */}
//       {resultMessage && (
//         <Typography
//           variant="h5"
//           sx={{ color: winner === username ? "green" : "red", mb: 2 }}
//         >
//           {resultMessage} {dialogEmoji}
//         </Typography>
//       )}

//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             height: "55vh",
//             borderTopLeftRadius: 16,
//             borderTopRightRadius: 16,
//             p: 2,
//           },
//         }}
//       >
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mb: 1 }}
//         >
//           <Typography variant="h6">🎲 เลขที่ออกแล้ว</Typography>

//           <IconButton fontSize="small" onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Stack>
//         <Divider sx={{ mb: 2 }} />

//         {drawnNumbers.length === 0 ? (
//           <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
//             ยังไม่มีการออกเลข
//           </Typography>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 1,
//               overflowY: "auto",
//               maxHeight: "100%",
//               pt: 1,
//             }}
//           >
//             {drawnNumbers.map((n) => (
//               <Chip
//                 key={n}
//                 label={n}
//                 color={board.includes(n) ? "primary" : "default"}
//                 variant={board.includes(n) ? "filled" : "outlined"}
//                 sx={{
//                   fontWeight: board.includes(n) ? "bold" : "normal",
//                   minWidth: 48, // ⭐ ความกว้างคงที่
//                   height: 32, // ⭐ ความสูงคงที่
//                   borderRadius: 16, // ⭐ กลมเท่ากัน
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               />
//             ))}
//           </Box>
//         )}
//       </Drawer>

//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         sx={{ width: "100%", maxWidth: 600, mb: 2 }}
//       >
//         <Typography variant="h6">🎯 เกมบิงโก</Typography>

//         <Chip
//           label={`🎲 เลขที่ออก (${drawnNumbers.length})`}
//           clickable
//           onClick={() => setDrawerOpen(true)}
//         />
//       </Stack>
//       {/* ⭐ ปุ่มขอการ์ดใหม่ (เอากลับมา) */}
//       {syncChecked && gameStarted && !winner && (
//         <Button
//           variant="contained"
//           color="error"
//           onClick={requestNewBoard}
//           disabled={drawnNumbers.length > 0} // ⭐ disable เมื่อมีเลขออกแล้ว
//           sx={{ mb: 2 }}
//         >
//           🔄 รีเฟรสตัวเลข
//         </Button>
//       )}

//       {!gameStarted && (
//         <Typography variant="h6" color="text.secondary">
//           🕹️ รอผู้ดูแลเริ่มเกม...
//         </Typography>
//       )}

//       {gameStarted && (
//         <Grid
//           container
//           spacing={1}
//           justifyContent="center"
//           sx={{ maxWidth: 600 }}
//         >
//           {board.map((num, i) => (
//             <Grid item xs={2.4} key={i}>
//               <Card
//                 sx={{
//                   aspectRatio: "1",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: "bold",
//                   fontSize: "1.2rem",
//                   borderRadius: 1.5,
//                   backgroundColor: marked.includes(num)
//                     ? "#2563eb"
//                     : drawnNumbers.includes(num)
//                     ? "#c7d2fe"
//                     : "#f8fafc",
//                   color: marked.includes(num) ? "white" : "black",
//                 }}
//               >
//                 {num === "FREE" ? "★" : num}
//               </Card>
//             </Grid>
//           ))}
//           <Typography variant="caption">Game Room: {gameId}</Typography>
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default BingoGame;
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Stack,
  Chip,
  Drawer,
  IconButton,
  Divider,
} from "@mui/material";
import confetti from "canvas-confetti";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

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

const defaults = { origin: { y: 0.7 } };

const BingoGame = ({ username, socket }) => {
  const { enqueueSnackbar } = useSnackbar();

  // ─────────────────────────
  // ⭐ Access control (NEW)
  // ─────────────────────────
  const [syncChecked, setSyncChecked] = useState(false);
  const [lockedOut, setLockedOut] = useState(false);

  // ─────────────────────────
  // Game state
  // ─────────────────────────
  const [board, setBoard] = useState([]);
  const [marked, setMarked] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null);

  // ─────────────────────────
  // UI state
  // ─────────────────────────
  const [resultMessage, setResultMessage] = useState(""); // ข้อความผลลัพธ์
  const [dialogEmoji, setDialogEmoji] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ─────────────────────────
  // Utils
  // ─────────────────────────
  const calculateMarked = (board, drawn) => [
    "FREE",
    ...board.filter((n) => drawn.includes(n)),
  ];

  // ⭐ ขอการ์ดใหม่
  const requestNewBoard = () => {
    if (!socket) return;
    socket.emit("requestNewBingoBoard", { username });
  };

  // ─────────────────────────
  // ⭐ STEP 1: ขอ sync จาก server (NEW)
  // ─────────────────────────
  useEffect(() => {
    if (!socket) return;
    socket.emit("syncBingoState", { username });
  }, [socket, username]);

  // ─────────────────────────
  // ⭐ STEP 2: รับผล sync (NEW)
  // ─────────────────────────
  useEffect(() => {
    if (!socket) return;

    socket.on("bingoSyncResult", (data) => {
      setSyncChecked(true);

      // ✅ room เดิม / refresh
      if (data.status === "SYNC") {
        setLockedOut(false);

        const { game_id, board, drawnNumbers } = data;
        const autoMarked = calculateMarked(board, drawnNumbers);

        setGameId(game_id);
        setBoard(board);
        setDrawnNumbers(drawnNumbers);
        setMarked(autoMarked);
        setGameStarted(true);

        localStorage.setItem("bingo_game_id", game_id);
        localStorage.setItem("bingo_board", JSON.stringify(board));
        localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));
        localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));
        return;
      }

      // ❌ เกมเริ่มไปแล้ว / room ไม่ตรง
      if (data.status === "GAME_IN_PROGRESS") {
        setLockedOut(true);
        setGameStarted(false);
        return;
      }

      // ⏳ ยังไม่มีเกม
      if (data.status === "NO_GAME") {
        setLockedOut(false);
        setGameStarted(false);
      }
    });

    return () => socket.off("bingoSyncResult");
  }, [socket]);

  // ─────────────────────────
  // Runtime socket events (เดิม)
  // ─────────────────────────
  useEffect(() => {
    if (!socket) return;

    socket.on("gameStartedBingo", ({ game_id, board, drawnNumbers }) => {
      setLockedOut(false);
      setSyncChecked(true);
      setWinningNumbers([]);

      setGameId(game_id);
      setBoard(board);
      setDrawnNumbers(drawnNumbers || []);
      setMarked(["FREE"]);
      setWinner(null);
      setGameStarted(true);
      setResultMessage(""); // เคลียร์ข้อความผลลัพธ์

      localStorage.setItem("bingo_game_id", game_id);
      localStorage.setItem("bingo_board", JSON.stringify(board));
      localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers || []));
      localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
    });

    socket.on("bingoBoardUpdated", ({ board }) => {
      setBoard(board);
      setMarked(["FREE"]);
      localStorage.setItem("bingo_board", JSON.stringify(board));
      localStorage.setItem("bingo_marked", JSON.stringify(["FREE"]));
    });

    socket.on("bingoBoardDenied", () => {
      alert("ไม่สามารถขอการ์ดใหม่ได้ เพราะมีการจับเลขแล้ว!");
    });

    socket.on("bingoNumber", ({ number, drawnNumbers }) => {
      setDrawnNumbers(drawnNumbers);

      const autoMarked = calculateMarked(board, drawnNumbers);
      setMarked(autoMarked);

      localStorage.setItem("bingo_drawn", JSON.stringify(drawnNumbers));
      localStorage.setItem("bingo_marked", JSON.stringify(autoMarked));

      enqueueSnackbar(`🎲 เลขที่ออก: ${number}`, {
        variant: board.includes(number) ? "success" : "info",
      });

      // ตรวจสอบบิงโกเมื่อมีเลขออกใหม่
      checkBingo(autoMarked, drawnNumbers);
    });

    socket.on("bingoWinner", ({ winner }) => {
      setWinner(winner);
      setGameStarted(false);

      setDialogEmoji(winner === username ? "🏆" : "😅");
      setResultMessage(
        winner === username
          ? "คุณชนะแล้ว!"
          : `เสียใจด้วย คุณแพ้แล้ว เพราะ ${winner} เป็นผู้ชนะ`
      );

      if (winner === username) fireConfetti();
    });

    return () => {
      socket.off("gameStartedBingo");
      socket.off("bingoNumber");
      socket.off("bingoWinner");
    };
  }, [socket, board, username, enqueueSnackbar]);

  // ─────────────────────────
  // ฟังก์ชันตรวจสอบบิงโก
  // ─────────────────────────
  // const checkBingo = (newMarked, drawn) => {
  //   if (winner || !gameStarted || !board.length) return;

  //   const size = 5; // ขนาดของบอร์ดบิงโก
  //   const isHit = (num) =>
  //     newMarked.includes(num) || num === "FREE" || drawn.includes(num);
  //   const isBingo = (indices) => indices.every((i) => isHit(board[i]));

  //   // ตรวจสอบแถวและคอลัมน์
  //   for (let i = 0; i < size; i++) {
  //     const row = Array.from({ length: size }, (_, j) => i * size + j);
  //     const col = Array.from({ length: size }, (_, j) => j * size + i);
  //     if (isBingo(row) || isBingo(col)) return handleWin(row); // ส่งแถวที่บิงโก
  //   }

  //   // ตรวจสอบแนวทแยง
  //   const diag1 = [0, 6, 12, 18, 24];
  //   const diag2 = [4, 8, 12, 16, 20];
  //   if (isBingo(diag1) || isBingo(diag2)) return handleWin(diag1); // ส่งแถวที่บิงโก
  // };

  // const handleWin = (winningRow) => {
  //   if (!winner) {
  //     socket.emit("bingoComplete", { username, game_id: gameId });
  //     setWinner(username);
  //     setGameStarted(false);

  //     localStorage.removeItem("bingo_game_id");
  //     localStorage.removeItem("bingo_board");
  //     localStorage.removeItem("bingo_drawn");
  //     localStorage.removeItem("bingo_marked");

  //     setDialogEmoji("🏆");
  //     setResultMessage("คุณชนะแล้ว!");
  //     fireConfetti();
  //   }
  // };
  const [winningNumbers, setWinningNumbers] = useState([]); // State สำหรับหมายเลขที่ชนะ
  const checkBingo = (newMarked, drawn) => {
    if (winner || !gameStarted || !board.length) return;

    const size = 5; // ขนาดของบอร์ดบิงโก
    const isHit = (num) =>
      newMarked.includes(num) || num === "FREE" || drawn.includes(num);
    const isBingo = (indices) => indices.every((i) => isHit(board[i]));

    // สร้างอาร์เรย์เพื่อเก็บหมายเลขที่บิงโก
    let winningNumbers = [];

    // ตรวจสอบแถวและคอลัมน์
    for (let i = 0; i < size; i++) {
      const row = Array.from({ length: size }, (_, j) => i * size + j);
      const col = Array.from({ length: size }, (_, j) => j * size + i);
      if (isBingo(row)) {
        winningNumbers = [
          ...winningNumbers,
          ...row.map((index) => board[index]),
        ]; // เก็บหมายเลขที่บิงโกในแถว
        return handleWin(winningNumbers); // ส่งหมายเลขที่บิงโก
      }
      if (isBingo(col)) {
        winningNumbers = [
          ...winningNumbers,
          ...col.map((index) => board[index]),
        ]; // เก็บหมายเลขที่บิงโกในคอลัมน์
        return handleWin(winningNumbers); // ส่งหมายเลขที่บิงโก
      }
    }

    // ตรวจสอบแนวทแยง
    const diag1 = [0, 6, 12, 18, 24];
    const diag2 = [4, 8, 12, 16, 20];
    if (isBingo(diag1)) {
      winningNumbers = [
        ...winningNumbers,
        ...diag1.map((index) => board[index]),
      ]; // เก็บหมายเลขที่บิงโกในแนวทแยง
      return handleWin(winningNumbers); // ส่งหมายเลขที่บิงโก
    }
    if (isBingo(diag2)) {
      winningNumbers = [
        ...winningNumbers,
        ...diag2.map((index) => board[index]),
      ]; // เก็บหมายเลขที่บิงโกในแนวทแยง
      return handleWin(winningNumbers); // ส่งหมายเลขที่บิงโก
    }
  };
  const handleWin = (winningNumbers) => {
    if (!winner) {
      socket.emit("bingoComplete", { username, game_id: gameId });
      setWinner(username);
      setGameStarted(false);

      localStorage.removeItem("bingo_game_id");
      localStorage.removeItem("bingo_board");
      localStorage.removeItem("bingo_drawn");
      localStorage.removeItem("bingo_marked");

      setDialogEmoji("🏆");
      setResultMessage("คุณชนะแล้ว!");

      // คุณสามารถเก็บหมายเลขที่ชนะใน state ถ้าต้องการ
      setWinningNumbers(winningNumbers); // เก็บหมายเลขที่ชนะ
      fireConfetti();
    }
  };

  // ─────────────────────────
  // Confetti
  // ─────────────────────────
  const fireConfetti = async () => {
    fireConfigurations.forEach((config) => {
      confetti({
        ...defaults,
        ...config.options,
        particleCount: Math.floor(200 * config.ratio),
        zIndex: 9999,
      });
    });
  };

  // ─────────────────────────
  // ⭐ Guard UI (NEW, ไม่แตะ layout)
  // ─────────────────────────
  if (!syncChecked) return null;

  if (lockedOut) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          🚫 เกมนี้เริ่มไปแล้ว กรุณารอรอบถัดไป
        </Typography>
      </Box>
    );
  }

  // ─────────────────────────
  // UI (เหมือนเดิมทุกจุด)
  // ─────────────────────────
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
      {/* แสดงข้อความผลลัพธ์ที่ด้านบน */}
      {resultMessage && (
        <Typography
          variant="h5"
          sx={{ color: winner === username ? "green" : "red", mb: 2 }}
        >
          {resultMessage} {dialogEmoji}
        </Typography>
      )}

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: "55vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6">🎲 เลขที่ออกแล้ว</Typography>

          <IconButton fontSize="small" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 2 }} />

        {drawnNumbers.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
            ยังไม่มีการออกเลข
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              overflowY: "auto",
              maxHeight: "100%",
              pt: 1,
            }}
          >
            {drawnNumbers.map((n) => (
              <Chip
                key={n}
                label={n}
                color={board.includes(n) ? "primary" : "default"}
                variant={board.includes(n) ? "filled" : "outlined"}
                sx={{
                  fontWeight: board.includes(n) ? "bold" : "normal",
                  minWidth: 48, // ⭐ ความกว้างคงที่
                  height: 32, // ⭐ ความสูงคงที่
                  borderRadius: 16, // ⭐ กลมเท่ากัน
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            ))}
          </Box>
        )}
      </Drawer>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", maxWidth: 600, mb: 2 }}
      >
        <Typography variant="h6">🎯 เกมบิงโก</Typography>

        <Chip
          label={`🎲 เลขที่ออก (${drawnNumbers.length})`}
          clickable
          onClick={() => setDrawerOpen(true)}
        />
      </Stack>
      {/* ⭐ ปุ่มขอการ์ดใหม่ (เอากลับมา) */}
      {syncChecked && gameStarted && !winner && (
        <Button
          variant="contained"
          color="error"
          onClick={requestNewBoard}
          disabled={drawnNumbers.length > 0} // ⭐ disable เมื่อมีเลขออกแล้ว
          sx={{ mb: 2 }}
        >
          🔄 รีเฟรสตัวเลข
        </Button>
      )}

      {!gameStarted && (
        <Typography variant="h6" color="text.secondary">
          🕹️ รอผู้ดูแลเริ่มเกม...
        </Typography>
      )}

      {/* {(gameStarted || winner) && ( // แสดงกระดานเมื่อเกมเริ่มหรือตอนที่มีผู้ชนะ
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ maxWidth: 600 }}
        >
          {board.map((num, i) => (
            <Grid item xs={2.4} key={i}>
              <Card
                sx={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderRadius: 1.5,
                  backgroundColor: marked.includes(num)
                    ? "#2563eb"
                    : drawnNumbers.includes(num)
                    ? "#c7d2fe"
                    : winner && marked.includes(num) // ถ้ามีผู้ชนะและหมายเลขนี้ถูกทำเครื่องหมาย
                    ? "#f70000ff" // เปลี่ยนพื้นหลังเป็นสีแดง
                    : "#f8fafc",
                  color: marked.includes(num) ? "white" : "black",
                }}
              >
                {num === "FREE" ? "★" : num}
              </Card>
            </Grid>
          ))}
          <Typography variant="caption">Game Room: {gameId}</Typography>
        </Grid>
      )} */}
      {(gameStarted || winner) && (
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ maxWidth: 600 }}
        >
          {board.map((num, i) => {
            // ตรวจสอบว่าหมายเลขนี้อยู่ในหมายเลขที่ชนะหรือไม่
            const isBingo = winningNumbers.includes(num); // ตรวจสอบหมายเลขที่ชนะ

            return (
              <Grid item xs={2.4} key={i}>
                <Card
                  sx={{
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    borderRadius: 1.5,
                    backgroundColor: isBingo // เปลี่ยนพื้นหลังเป็นสีแดงถ้าหมายเลขนี้ชนะ
                      ? "red"
                      : marked.includes(num)
                      ? "#2563eb"
                      : drawnNumbers.includes(num)
                      ? "#c7d2fe"
                      : "#f8fafc",
                    color: marked.includes(num) ? "white" : "black",
                  }}
                >
                  {num === "FREE" ? "★" : num}
                </Card>
              </Grid>
            );
          })}
          <Typography variant="caption">Game Room: {gameId}</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default BingoGame;
