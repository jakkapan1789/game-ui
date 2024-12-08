import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 2,
        bgcolor: "white",
        boxShadow: 2,
        position: "sticky",
        bottom: 0,
        marginBottom:
          window.visualViewport && window.innerHeight - viewportHeight,
      }}
    >
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        fullWidth
        size="small"
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};
