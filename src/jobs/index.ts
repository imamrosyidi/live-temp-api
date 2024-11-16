import { CronJob } from "cron";
import { temperatureJob } from "./temperature.job";
import { truncateTemperatureJob } from "./truncateTemperature.job";

export const cronJobs: Array<{ name: string; job: CronJob }> = [
  {
    name: "Temperature Update Job",
    job: temperatureJob,
  },
  {
    name: "Trucate Temperature Job",
    job: truncateTemperatureJob,
  },
];
