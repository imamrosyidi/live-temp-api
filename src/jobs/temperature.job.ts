import { CronJob } from "cron";
import { io } from "@/initializers/socket";
import temperatureService from "@/app/services/temperature.service";

export const temperatureJob = new CronJob("*/5 * * * * *", async () => {
  const temperature = await temperatureService.generateAndInsertTemperature();
  io.emit("temperature-update", temperature);
  console.info("succesfully emit message : ", temperature);
});
