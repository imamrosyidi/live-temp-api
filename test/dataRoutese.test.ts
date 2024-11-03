import request from "supertest";
import app from "../src/app/app";
import knex from "knex";
import temperatureService from "./../src/app/services/temperature.service";
import knexConfig from "../src/db/knexfile";
import { Knex } from "knex";

describe("API Data Retrieval", () => {
  let db: Knex;

  // make sure that env set to development environment
  beforeAll(async () => {
    db = knex(knexConfig);
    await db.raw(`TRUNCATE TABLE temperatures RESTART IDENTITY CASCADE`);

    // this service that running in cron job
    await temperatureService.generateAndInsertTemperature();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should retrieve data with correct UTC timestamp format from /api/temperatures", async () => {
    const rawResponse = await request(app).get("/api/temperatures");
    expect(rawResponse.status).toBe(200);

    // Check that the response body has the expected structure
    expect(rawResponse.body).toHaveProperty("data");
    expect(Array.isArray(rawResponse.body.data)).toBe(true);
    console.log(rawResponse.body.data);

    rawResponse.body.data.forEach(
      (entry: { created_at: string; value: number }) => {
        // Verify that temperature is a number
        expect(typeof entry.value).toBe("number");

        // Verify that created_at is a valid date string in UTC format
        const date = new Date(entry.created_at);
        expect(date.toISOString()).toBe(entry.created_at);

        // Ensure the date is valid
        expect(!isNaN(date.getTime())).toBe(true);
      }
    );
  });
});
