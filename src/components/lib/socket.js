// lib/socket.js
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER, {
  //   autoConnect: false, // ป้องกัน connect ทันที
});

export default socket;
