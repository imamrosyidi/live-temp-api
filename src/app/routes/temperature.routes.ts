import express from "express";
import { getTemperatureByTimeRange } from "@/app/controllers/temperature.controller";

const router = express.Router();

router.get("/temperature", getTemperatureByTimeRange);

export default router;
