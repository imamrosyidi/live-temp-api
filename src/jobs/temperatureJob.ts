import { CronJob } from "cron";
import { io } from "@/server";
import { createDummyTemperature } from "@/controllers/temperatureController";
import { insertTemperature } from "@/repositories/temperatureRepositories";

export const temperatureJob = new CronJob("*/5 * * * * *", async () => {
  const temperatureData = await createDummyTemperature();
  await insertTemperature(temperatureData);
  io.emit("temperature-update", temperatureData);
  console.info("succesfully emit message : ", temperatureData);
});
