import { startServer } from "@/initializers/server";
import { initializeSocket } from "@/initializers/socket";
import { startCronJobs } from "@/initializers/cronJob";

initializeSocket();
startCronJobs();
startServer();
