import { getSystemInfo } from "@/utils/systemInfo";
import express, { Response } from "express";
import swaggerUi from "swagger-ui-express";
import authRoutes from "@/app/routes/auth.routes";
import temperatureRoutes from "@/app/routes/temperature.routes";
import swaggerSpecs from "@/configs/swagger";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", temperatureRoutes);
app.use("/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/me", async (_, res: Response) => {
  try {
    const myInfo = await getSystemInfo();
    res.json(myInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve information" });
  }
});

export default app;
