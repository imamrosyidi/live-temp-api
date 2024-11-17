import Redis from "ioredis";
import config from "@/configs/config";

const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_AUTH,
});

redisClient.on("connect", () => {
  console.log("connected to redis");
});

redisClient.on("error", (err: Error) => {
  console.error("redis connection error: ", err.message);
});

export default redisClient;
