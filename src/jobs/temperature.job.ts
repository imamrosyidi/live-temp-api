import { CronJob } from "cron";

import { createDummyTemperature } from "@/app/controllers/temperature.controller";
import { insertTemperature } from "@/app/repository/temperature.repository";
import { io } from "@/initializers/socket";

export const temperatureJob = new CronJob("*/5 * * * * *", async () => {
  const temperatureData = await createDummyTemperature();
  await insertTemperature(temperatureData);
  io.emit("temperature-update", temperatureData);
  console.info("succesfully emit message : ", temperatureData);
});
