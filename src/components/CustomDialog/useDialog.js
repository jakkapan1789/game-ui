import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  Box,
  Typography,
  Stack,
  Zoom,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter } from "next/router";

const useDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    message: "",
    icon: "",
    btnConfirmText: "Ok",
    btnCancelText: "",
    btnConfirmRedirectUrl: "",
  });
  const [resolve, setResolve] = useState(null);

  const showDialog = ({
    title,
    message,
    icon,
    btnConfirmText,
    btnCancelText,
    btnConfirmRedirectUrl,
  }) => {
    setDialogData({
      title,
      message,
      icon,
      btnConfirmText,
      btnCancelText,
      btnConfirmRedirectUrl,
    });
    setOpen(true);

    return new Promise((resolve) => {
      setResolve(() => resolve);
    });
  };

  const handleClose = (result) => {
    setOpen(false);
    if (resolve) {
      resolve(result);
    }
  };

  const DialogComponent = (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose(false);
        }
      }}
      TransitionComponent={Zoom}
      disableEscapeKeyDown={true}
    >
      <DialogContent>
        <Box
          sx={{
            pt: 2,
            pl: 2,
            pr: 2,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Stack
            direction="column"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {dialogData.icon === "success" ? (
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#1e3a8a" }} />
            ) : dialogData.icon === "error" ? (
              <InfoOutlinedIcon
                sx={{
                  fontSize: 60,
                  color: "#1e3a8a",
                  transform: "rotate(180deg)",
                }}
              />
            ) : null}

            <Typography variant="h5" sx={{ pb: 1, pt: 1, color: "#1e3a8a" }}>
              {dialogData.title}
            </Typography>
            <Typography sx={{ color: "#1e3a8a" }}>
              {dialogData.message}
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1} sx={{ pl: 3, pr: 3, pb: 2 }}>
          {dialogData.btnCancelText ? (
            <>
              <Grid item xs={6}>
                <Button
                  onClick={() => handleClose(false)}
                  sx={{
                    color: "#1e3a8a",
                    borderColor: "#1e3a8a",
                    ":hover": { borderColor: "#1e3a8a" },
                    textTransform: "none",
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {dialogData.btnCancelText}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => handleClose(true)}
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #1e3a8a, #3b82f6)",
                    textTransform: "none",
                  }}
                  variant="contained"
                  autoFocus={false}
                  fullWidth
                >
                  {dialogData.btnConfirmText}
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  if (dialogData.btnConfirmRedirectUrl) {
                    router.push(dialogData.btnConfirmRedirectUrl);
                  }
                  handleClose(true);
                }}
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #1e3a8a, #3b82f6)",
                  textTransform: "none",
                }}
                variant="contained"
                autoFocus={false}
                fullWidth
              >
                {dialogData.btnConfirmText}
              </Button>
            </Grid>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );

  return [showDialog, DialogComponent];
};

export default useDialog;
