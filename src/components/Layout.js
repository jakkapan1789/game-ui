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
  Skeleton,
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

  // console.log("users", users);
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

  const [qrLoading, setQrLoading] = React.useState(true);

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="fixed"
        component="nav"
        sx={{
          height: 64,
          background:
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b46c1 100%)",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          color: "#ffffff",
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
            IT GAMES
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              variant="body1"
              sx={{
                color: "white",
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
          height: "100dvh", // ⭐แก้ปัญหา scroll บนมือถือ
          width: "100%",
          overflow: "hidden", // ⭐ ปิด scroll เผื่อมีการคำนวณผิด
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
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ผู้ใช้งานออนไลน์ ({users.length})
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 2,
            py: 1,
          }}
        >
          <List disablePadding>
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
              <Typography sx={{ textAlign: "center", color: "gray", mt: 2 }}>
                ไม่มีผู้ใช้ออนไลน์
              </Typography>
            )}
          </List>
        </Box>

        <Box sx={{ p: 2 }}>
          <Divider sx={{ mb: 2 }} />

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
            }}
          >
            สนับสนุนเลี้ยงกาแฟทีมงาน ☕💖
          </Button>

          <Button
            variant="contained"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              // background: "linear-gradient(90deg,#1e3a8a,#3b82f6)",
              background:
                "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b46c1 100%)",
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

          {/* Skeleton แนวตั้ง */}
          {qrLoading && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: "100%",
                aspectRatio: "4 / 6", // ⭐ แนวตั้ง
                borderRadius: 2,
                mb: 2,
                minHeight: 370,
                maxHeight: 370,
              }}
            />
          )}

          {/* ภาพ QR แนวตั้ง */}
          <Box
            component="img"
            src="/images/qr-payment.jpeg"
            alt="Donate QR"
            onLoad={() => setQrLoading(false)}
            sx={{
              width: "100%",
              aspectRatio: "4 / 6", // ⭐ แนวตั้งเหมือน Skeleton
              objectFit: "cover", // หรือ "contain" ถ้าไม่อยากครอป
              borderRadius: 2,
              mb: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              opacity: qrLoading ? 0 : 1,
              transition: "opacity 0.4s ease",
              display: qrLoading ? "none" : "block",
              minHeight: 370,
              maxHeight: 370,
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseDonate}
            sx={{
              py: 1,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b46c1 100%)",
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
