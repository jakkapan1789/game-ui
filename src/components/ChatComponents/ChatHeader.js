import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ChatHeader = ({ groupName, participantCount }) => {
  return (
    <Box
      sx={{ p: 2, bgcolor: "primary.main", color: "white", borderRadius: 1 }}
    >
      <Typography variant="h6">{groupName}</Typography>
      <Typography variant="body2">{participantCount} participants</Typography>
    </Box>
  );
};
