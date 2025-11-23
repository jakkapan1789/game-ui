import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import {
  Stack,
  ListItem,
  ListItemText,
  List,
  Dialog,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { styled, useTheme } from "@mui/material/styles";

export default function Layout({ username, users, children }) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  console.log("users", users);
  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsDrawerOpen(false);
    router.push("/login");
  };

  const theme = useTheme();

  /* ⭐ Donation Dialog State */
  const [openDonate, setOpenDonate] = React.useState(false);
  const handleOpenDonate = () => setOpenDonate(true);
  const handleCloseDonate = () => setOpenDonate(false);

  return (
    <React.Fragment>
      <CssBaseline />

      {/* ⭐ Header สไตล์เกม */}
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          background: "linear-gradient(90deg,#1e3a8a,#3b82f6,#6366f1)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 0 14px rgba(59,130,246,0.5)",
          height: 64,
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "white",
              textShadow: "0 0 12px rgba(255,255,255,0.8)",
            }}
          >
            FITS GAME
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                // display: { xs: "none", sm: "block" },
                textShadow: "0 0 6px rgba(255,255,255,0.5)",
              }}
            >
              Welcome, {username}
            </Typography>

            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // ✅ ใช้ height แทน minHeight
          width: "100%",
        }}
      >
        <Toolbar /> {/* เว้น Header */}
        <Box
          sx={{
            flex: 1, // ✅ ขยายเต็มที่ระหว่าง header กับ footer
            display: "flex",
            flexDirection: "column",
            overflow: "auto", // ✅ ถ้ามีเนื้อหาเยอะ ให้ scroll
            px: 2,
          }}
        >
          {children}
        </Box>{" "}
      </Box>

      {/* ⭐ Drawer ใหม่ สวยแบบเกม */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 320,
            background: "linear-gradient(180deg,#ffffffdd,#f1f5f9dd)",
            backdropFilter: "blur(14px)",
            borderLeft: "1px solid rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Drawer */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ผู้ใช้งานออนไลน์ ({users.length})
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* ⭐ รายชื่อผู้ใช้งาน */}
          <List sx={{ flexGrow: 1 }}>
            {users.length ? (
              users.map((user, index) => (
                <ListItem key={index} sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                    }}
                  />
                  <ListItemText primary={user} />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ textAlign: "center", color: "gray" }}>
                ไม่มีผู้ใช้ออนไลน์
              </Typography>
            )}
          </List>

          <Divider sx={{ mt: 2, mb: 2 }} />

          {/* ⭐ ปุ่ม Donation */}
          <Button
            variant="contained"
            onClick={handleOpenDonate}
            fullWidth
            startIcon={<CoffeeIcon />}
            sx={{
              borderRadius: 2,
              py: 1.4,
              mb: 1.5,
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(90deg,#ec4899,#f97316)",
              boxShadow: "0 0 14px rgba(249,115,22,0.5)",
              "&:hover": {
                background: "linear-gradient(90deg,#db2777,#ea580c)",
              },
            }}
          >
            สนับสนุนเลี้ยงกาแฟทีมงาน ☕💖
          </Button>

          {/* ⭐ ปุ่ม Logout */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              background: "linear-gradient(90deg,#1e3a8a,#3b82f6)",
              "&:hover": {
                background: "linear-gradient(90deg,#1e40af,#3b82f6)",
              },
            }}
          >
            ออกจากระบบ
          </Button>
        </Box>
      </Drawer>

      {/* ⭐ Dialog Donate */}
      <Dialog
        open={openDonate}
        onClose={handleCloseDonate}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent
          sx={{
            textAlign: "center",
            p: 3,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            ☕ สนับสนุนทีมงาน
          </Typography>

          <Typography sx={{ mb: 2, color: "#475569" }}>
            สนับสนุนเลี้ยงกาแฟทีมงานได้ การสนับสนุนของคุณช่วยให้เราพัฒนาเกมดีๆ
            ต่อไป ❤️
          </Typography>

          <Box
            component="img"
            src="/images/qr-payment.jpeg"
            alt="Donate QR"
            sx={{
              width: "100%",
              borderRadius: 2,
              mb: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseDonate}
            sx={{
              py: 1,
              borderRadius: 2,
              background: "linear-gradient(90deg,#1e3a8a,#3b82f6)",
              fontWeight: 600,
            }}
          >
            ปิด
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
