import db from "@/configs/database";
import { Temperature } from "@/app/models/temperature.model";

export const TemperatureRepository = {
  async addTemperature(temperature: Temperature) {
    try {
      const { value, created_at } = temperature;
      await db.query(
        "INSERT INTO temperatures (value, created_at) VALUES ($1, $2)",
        [value, created_at]
      );
    } catch (error) {
      console.error("Error inserting temperature:", error.message);
      throw new Error("Failed to insert temperature record");
    }
  },

  async getTemperaturesInRange(hours: number): Promise<Temperature[]> {
    try {
      const cutoff = new Date(
        Date.now() - hours * 60 * 60 * 1000
      ).toISOString();

      const rows = await db.query(
        ` SELECT value, created_at FROM temperatures
          WHERE created_at >= $1
          ORDER BY created_at DESC`,
        [cutoff]
      );

      return rows;
    } catch (error) {
      console.error("Error fetch temperature:", error.message);
      throw new Error("Failed to fetch temperature record");
    }
  },
};
