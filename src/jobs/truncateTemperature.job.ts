import temperatureService from "@/app/services/temperature.service";
import { CronJob } from "cron";

export const truncateTemperatureJob = new CronJob(
  "0 6 * * *",
  async () => {
    await temperatureService.truncateTemperatures();
    console.info("succesfully truncate temperatures table");
  },
  null,
  false,
  "Asia/Jakarta"
);
