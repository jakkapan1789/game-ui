import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

export default function DialogExport({ open, onClose, filter, data }) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(event, reason);
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="success"
          onClose={handleSnackbarClose}
          sx={{
            border: "1px solid green",
            padding: "12px",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "75px",
            maxHeight: "75px",
            minWidth: "400px",
          }}
          icon={
            loading ? (
              <CircularProgress size={30} color="success" />
            ) : (
              <CheckCircleIcon size={30} />
            )
          }
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="body1">
              {loading
                ? "Generating....."
                : `jakkapanp_2024_12_23.xls  ${fileName}`}
            </Typography>

            {!loading && (
              <Button
                sx={{
                  ml: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  pl: 2,
                  pr: 2,
                }}
                color="success"
                size="small"
                variant="contained"
                onClick={() => handleExportToExcel()}
              >
                Download
              </Button>
            )}
          </Stack>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
