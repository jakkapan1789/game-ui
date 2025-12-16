import * as React from "react";
import Head from "next/head";
import { io } from "socket.io-client";
import MemoryGame from "@/components/MemoryGame";
import QuestionGame from "@/components/QuestionGame";
import BingoGame from "@/components/BingoGame";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import LogoQuiz from "@/components/LogoQuiz";
// import { SnackbarProvider } from "notistack";

function App() {
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [gameOnline, setGameOnline] = React.useState(0);

  // ─────────────────────────────────────────────
  // เชื่อมต่อ socket server
  // ─────────────────────────────────────────────
  React.useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);
    setSocket(newSocket);

    // อัพเดต user ออนไลน์
    newSocket.on("updateUsers", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // เมื่อ admin เปลี่ยนเกม (tab)
    newSocket.on("gameActive", (gameNo) => {
      // console.log("Game changed:", gameNo);
      setGameOnline(gameNo);
      if (gameNo !== 2) {
        localStorage.removeItem("bingo_game_id");
        localStorage.removeItem("bingo_board");
        localStorage.removeItem("bingo_drawn");
        localStorage.removeItem("bingo_marked");
      }
    });

    // ✅ เมื่อเชื่อมต่อใหม่ ให้รับสถานะเกมปัจจุบันจาก server
    newSocket.on("currentGame", (gameNo) => {
      // console.log("Current game from server:", gameNo);
      setGameOnline(gameNo);
    });

    return () => {
      newSocket.off("updateUsers");
      newSocket.off("gameActive");
      newSocket.off("currentGame");
      newSocket.close();
    };
  }, []);

  // ─────────────────────────────────────────────
  // Login เข้าระบบเมื่อมี socket
  // ─────────────────────────────────────────────
  React.useEffect(() => {
    if (socket) {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) {
        setUsername(savedUsername);
        socket.emit("login", savedUsername);
      }
    }
  }, [socket]);

  // ─────────────────────────────────────────────
  // Render Layout + เกมที่กำลังออนไลน์
  // ─────────────────────────────────────────────
  return (
    <React.Fragment>
      <Head>
        <title>Playing - IT Games</title>
        <meta name="description" content="FITS Game Online Play" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
      > */}
      <Layout username={username} users={users}>
        {gameOnline === 0 && (
          <QuestionGame username={username} socket={socket} />
        )}
        {gameOnline === 1 && <MemoryGame username={username} socket={socket} />}
        {gameOnline === 2 && <BingoGame username={username} socket={socket} />}

        {gameOnline === 3 && <LogoQuiz username={username} socket={socket} />}
      </Layout>
      {/* </SnackbarProvider> */}
    </React.Fragment>
  );
}

export default withAuth(App);
