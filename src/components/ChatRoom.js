import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { ChatHeader } from "./ChatComponents/ChatHeader";
import { ChatInput } from "./ChatComponents/ChatInput";
import { ChatMessage } from "./ChatComponents/ChatMessage";
import { useTheme } from "@mui/material/styles";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hey everyone! How's it going?",
      timestamp: new Date(Date.now() - 3600000),
      sent: false,
      senderName: "Sarah",
    },
    {
      id: 2,
      content: "Just working on some new designs!",
      timestamp: new Date(Date.now() - 3000000),
      sent: true,
      senderName: "You",
    },
    {
      id: 3,
      content: "That's great! Can't wait to see them.",
      timestamp: new Date(Date.now() - 2400000),
      sent: false,
      senderName: "Mike",
    },
  ]);

  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const handleSend = (content) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        timestamp: new Date(),
        sent: true,
        senderName: "You",
      },
    ]);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        // backgroundColor: "grey.100",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down("sm")]: {
            padding: 1,
          },
        }}
      >
        {/* <ChatHeader groupName="Design Team" participantCount={5} /> */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: 1,
            height: "100%",
            maxHeight: "80vh", // Limit height for better usability
          }}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              timestamp={message.timestamp}
              sent={message.sent}
              senderName={message.senderName}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <ChatInput onSend={handleSend} />
      </Container>
    </Box>
  );
};

export default ChatRoom;
