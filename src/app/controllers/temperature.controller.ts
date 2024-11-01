import { Request, Response } from "express";
import { Temperature } from "../models/temperature.model";
import { generateDummyTemperature } from "../services/temperature.service";
import { getTemperaturesByTimeRange } from "../repository/temperature.repository";

export const createDummyTemperature = async () => {
  const temperature = generateDummyTemperature();
  return temperature;
};

export const getTemperatureByTimeRange = async (
  req: Request,
  res: Response
) => {
  try {
    const { start, end } = req.query;
    const temperatures = await getTemperaturesByTimeRange();

    res.json({ data: temperatures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
