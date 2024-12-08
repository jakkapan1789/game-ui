import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Stack, TextField, ListItem, Card, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Head from "next/head";
import { io } from "socket.io-client";
import MemoryGame from "@/components/MemoryGame";
import QuestionGame from "@/components/QuestionGame";

export default function App() {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);
    setSocket(newSocket);

    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("updateUsers", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  React.useEffect(() => {
    if (socket) {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) {
        setUsername(savedUsername);
        setIsLoggedIn(true);
        socket.emit("login", savedUsername);
      }
    }
  }, [socket]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && socket) {
      socket.emit("login", username);
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && socket) {
        socket.emit("message", message);
        setMessage("");
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>Login - FITS Game</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            overflowY: "hidden",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              maxWidth: 400,
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              m: 2,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              mb={2}
              sx={{
                fontWeight: "bold",
                backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Welcome to FITS Game
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="ชื่อเล่น"
                size="small"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                margin="normal"
                variant="outlined"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  backgroundImage:
                    "linear-gradient(to right, #1e3a8a, #3b82f6)",
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </Paper>
        </Box>
      </>
    );
  }
  return (
    <React.Fragment key={refreshKey}>
      <Head>
        <title>Play - FITS Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            FITS Game
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 2, color: "white" }}>
              Welcome, {username}
            </Typography>
            <Box sx={{ xs: "block", md: "none" }}>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      <Box key={refreshKey} component="main" sx={{ p: 3 }}>
        <Toolbar />
        {/* <QuestionGame key={refreshKey} /> */}
        <MemoryGame username={username} />
      </Box>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 300,
            padding: 2,
            backgroundColor: "background.paper",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <Typography variant="h6">Online Users ({users.length})</Typography>
            <IconButton color="inherit" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ marginBottom: 2 }} />

          <List sx={{ flexGrow: 1 }}>
            {users.length > 0 ? (
              users.map((user, index) => (
                <ListItem
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "green",
                    }}
                  />
                  <ListItemText primary={user} />
                </ListItem>
              ))
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center" }}
              >
                No users online
              </Typography>
            )}
          </List>

          <Divider sx={{ marginTop: 2 }} />

          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
            }}
            onClick={handleLogout}
          >
            ออกจากระบบ
          </Button>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
