import http from "http";
import app from "@/app/app";
import { config } from "@/configs/config";

const server = http.createServer(app);

export const startServer = () => {
  server.listen(config.APP_PORT, () => {
    console.log(`Server running at http://localhost:${config.APP_PORT}`);
  });
};

export default server;
