import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ChatMessage = ({ content, timestamp, sent, senderName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: sent ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {sent ? "You" : senderName}
      </Typography>
      <Box
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: sent ? "primary.main" : "grey.300",
          color: sent ? "white" : "black",
          maxWidth: "75%",
          wordWrap: "break-word",
        }}
      >
        {content}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {timestamp.toLocaleTimeString()}
      </Typography>
    </Box>
  );
};
