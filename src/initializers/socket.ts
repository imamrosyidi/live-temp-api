import { Server } from "socket.io";
import server from "./server";

export let io: Server;

export const initializeSocket = () => {
  io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
