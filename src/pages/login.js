// import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Head from "next/head";
// import { useRouter } from "next/router";

// export default function App() {
//   const router = useRouter();
//   const [username, setUsername] = React.useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       localStorage.setItem("username", username);
//       router.push("/play");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Login - FITS Game</title>
//         <meta name="description" content="Login to FITS Game" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <Box
//         sx={{
//           height: "100vh",
//           width: "100vw",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           bgcolor: "#f7f8fa",
//           overflow: "hidden", // ✅ ป้องกัน scroll
//         }}
//       >
//         <Box
//           component="form"
//           onSubmit={handleLogin}
//           sx={{
//             width: "90%",
//             maxWidth: 380,
//             bgcolor: "white",
//             p: 4,
//             borderRadius: 3,
//             boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 2,
//             m: 5,
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 600,
//               color: "#1e293b",
//               letterSpacing: "0.3px",
//             }}
//           >
//             FITS Game
//           </Typography>

//           <Typography
//             variant="body2"
//             sx={{
//               color: "text.secondary",
//               mb: 1,
//               textAlign: "center",
//             }}
//           >
//             เข้าสู่ระบบเพื่อเริ่มเล่นเกม
//           </Typography>

//           <TextField
//             fullWidth
//             label="ชื่อเล่น"
//             variant="outlined"
//             size="small"
//             autoComplete="off"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 2,
//               },
//             }}
//             required
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               textTransform: "none",
//               fontWeight: 600,
//               mt: 1,
//               borderRadius: 2,
//               py: 1.2,
//               bgcolor: "#2563eb",
//               "&:hover": {
//                 bgcolor: "#1e40af",
//               },
//             }}
//           >
//             เข้าสู่ระบบ
//           </Button>
//         </Box>

//         <Typography
//           variant="caption"
//           sx={{
//             mt: 3,
//             color: "text.secondary",
//             userSelect: "none",
//             opacity: 0.6,
//           }}
//         >
//           © {new Date().getFullYear()} FITS Game Powered by Idelix Nimble All
//           rights reserved.
//         </Typography>
//       </Box>
//     </>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username);
      router.push("/play");
    }
  };

  return (
    <>
      <Head>
        <title>Login - FITS Game</title>
      </Head>

      {/* 🔥 Animated Gradient Background */}
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b46c1 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 12s ease infinite",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        {/* Glassmorphism Login Card */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "90%",
            maxWidth: 380,
            backdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 4,
            p: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white",
            ml: 2,
            mr: 2,
          }}
        >
          {/* Game Logo Text */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: "0 0 12px rgba(255,255,255,0.6)",
              letterSpacing: "1px",
            }}
          >
            FITS GAME
          </Typography>

          <Typography
            sx={{
              opacity: 0.85,
              fontSize: "0.9rem",
              mb: 3,
              textAlign: "center",
            }}
          >
            ใส่ชื่อเล่นของคุณเพื่อเริ่มต้นความสนุก!
          </Typography>

          <TextField
            fullWidth
            label="ชื่อเล่น"
            variant="filled"
            autoComplete="off"
            InputProps={{
              disableUnderline: true, // ⛔ ตัวนี้ปิด underline ระดับ component
              style: {
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(4px)",
              },
            }}
            InputLabelProps={{ style: { color: "#eee" } }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              mb: 2,
              "& .MuiFilledInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "& .MuiFilledInput-root:before": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root:after": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root.Mui-focused:after": {
                borderBottom: "none !important",
              },
              "& .MuiFilledInput-root.Mui-focused:before": {
                borderBottom: "none !important",
              },
              fontSize: 16,
            }}
          />

          {/* Glow Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1.05rem",
              textTransform: "none",
              background: "linear-gradient(90deg,#4f46e5,#9333ea)",
              boxShadow: "0 0 12px rgba(147,51,234,0.7)",
              "&:hover": {
                background: "linear-gradient(90deg,#4338ca,#7e22ce)",
                boxShadow: "0 0 18px rgba(147,51,234,0.9)",
              },
            }}
          >
            ▶ เข้าสู่เกม
          </Button>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            color: "white",
            opacity: 0.8,
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} FITS Game — Powered by Idelix Nimble
        </Box>
      </Box>
    </>
  );
}
