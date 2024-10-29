import express, { Response } from "express";
import swaggerUi from "swagger-ui-express";
import temperatureRoutes from "@/routes/temperatureRoutes";
import swaggerSpecs from "@/configs/swagger";
import os from "os";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api", temperatureRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/me", async (_, res: Response) => {
  try {
    const myIp = await fetch("https://api.ipify.org")
      .then((res) => res.text())
      .catch(() => "Unavailable");

    const myInfo = {
      ip: myIp,
      nodeVersion: process.version,
      platform: process.platform,
      hostname: os.hostname(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    res.json(myInfo);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve information" });
  }
});

export default app;
