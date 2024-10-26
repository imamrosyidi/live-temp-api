import express, { Express, Request, Response } from "express";
import config from "@/configs/config";
import os from "os";

const app: Express = express();

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

app.listen(config.APP_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${config.APP_PORT}`
  );
});
