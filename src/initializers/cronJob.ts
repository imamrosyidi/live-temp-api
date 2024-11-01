import { temperatureJob } from "@/jobs/temperature.job";

export const startCronJobs = () => {
  temperatureJob.start();
};
