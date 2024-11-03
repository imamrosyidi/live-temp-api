import { Request, Response } from "express";
import temperatureService from "../services/temperature.service";

export const getTemperatures = async (req: Request, res: Response) => {
  try {
    const munites =
      req.query.munites !== undefined
        ? parseInt(req.query.munites as string)
        : 5;

    if (isNaN(munites) || munites <= 1 || munites > 60) {
      res
        .status(400)
        .json({ message: "Minutes must be a number between 1 and 60" });
    }
    const data = await temperatureService.getTemperaturesInRange(munites);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
