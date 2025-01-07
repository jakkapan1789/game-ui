import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Stack, ListItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
export default function Layout({ username, users, children }) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsDrawerOpen(false);
    router.push("/login");
  };

  return (
    <React.Fragment>
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
            App Game
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

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {children}
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
            <Typography variant="h6">
              ผู้ใช้งานออนไลน์ ({users.length})
            </Typography>
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
                ไม่มีผู้ใช้ออนไลน์
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
