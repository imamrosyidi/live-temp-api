import express from "express";
import { getTemperatures } from "../controllers/temperature.controller";

const router = express.Router();

router.get("/temperatures", getTemperatures);

export default router;
