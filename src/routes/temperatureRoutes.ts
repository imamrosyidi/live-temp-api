import express from "express";
import { getTemperatureByTimeRange } from "@/controllers/temperatureController";

const router = express.Router();

router.get("/data", getTemperatureByTimeRange);

export default router;
