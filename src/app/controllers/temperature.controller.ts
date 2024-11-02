import { Request, Response } from "express";
import temperatureService from "../services/temperature.service";

export const getTemperatures = async (req: Request, res: Response) => {
  try {
    const hours =
      req.query.hours !== undefined ? parseInt(req.query.hours as string) : 1;

    if (isNaN(hours) || hours < 1 || hours > 6) {
      res
        .status(400)
        .json({ message: "Hours must be a number between 1 and 6." });
    }
    const data = await temperatureService.getTemperaturesInRange(hours);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
