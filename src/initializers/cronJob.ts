import { cronJobs } from "@/jobs";

export const startCronJobs = () => {
  cronJobs.forEach(({ name, job }) => {
    job.start();
    console.info(`Cron job started: ${name}`);
  });
};
