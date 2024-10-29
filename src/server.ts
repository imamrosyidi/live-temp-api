import http from "http";
import { Server } from "socket.io";
import app from "@/app";
import { handleTemperatureSocket } from "@/sockets/temperatureSocket";
import { config } from "@/configs/config";
import { temperatureJob } from "@/jobs/temperatureJob";

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", handleTemperatureSocket);

temperatureJob.start();

server.listen(config.APP_PORT, () => {
  console.log(`Server running at http://localhost:${config.APP_PORT}`);
});
