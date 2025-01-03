import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { Typography, Stack } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 170,
    color: theme.palette.text.primary,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function UserProfile() {
  const router = useRouter(); // Initialize useRouter hook
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <Button
        fullWidth
        id="change-language-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        size="small"
        disableElevation
        onClick={handleClick}
        sx={{
          borderColor: "#F1F0E8",
          borderRadius: 2,
          pl: 2,
          pr: 2,
          fontSize: 16,
          color: "#373A40",
          textTransform: "none",
          ":hover": {
            bgcolor: "#EEEEEE",
          },
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Jakkapan Pakeerat
      </Button> */}
      <Stack
        direction={"row"}
        spacing={1}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography>Jakkapan Pakeerat</Typography>
        <IconButton color="inherit" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </Stack>

      <StyledMenu
        id="language-menu"
        MenuListProps={{
          "aria-labelledby": "change-language-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
          disableRipple
        >
          <FaceIcon />
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
          disableRipple
        >
          <LogoutIcon />
          Log out
        </MenuItem>
      </StyledMenu>
    </>
  );
}
