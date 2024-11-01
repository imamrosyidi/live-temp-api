import db from "@/configs/database";
import { Temperature } from "@/app/models/temperature.model";

export const insertTemperature = async (
  temperature: Temperature
): Promise<void> => {
  const { value, created_at } = temperature;

  try {
    await db.query(
      "INSERT INTO temperatures (value, created_at) VALUES ($1, $2)",
      [value, created_at]
    );
  } catch (error) {
    console.error("Error inserting temperature:", error);
    throw new Error("Failed to insert temperature record");
  }
};

export const getTemperaturesByTimeRange = async (
  start?: string,
  end?: string
): Promise<Temperature[]> => {
  const now = new Date();

  const query = start
    ? `SELECT * FROM temperatures WHERE created_at BETWEEN $1 AND $2 ORDER BY created_at ASC`
    : `SELECT * FROM temperatures WHERE created_at >= NOW() - INTERVAL '24 hours' ORDER BY created_at ASC LIMIT 100`;

  const values = start ? [start, end || now] : [];

  try {
    const rows = await db.query(query, values);
    return rows as Temperature[];
  } catch (error) {
    console.error("Error retrieving temperatures:", error);
    throw new Error("Failed to retrieve temperatures");
  }
};
