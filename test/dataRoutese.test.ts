import request from "supertest";
import app from "@/app"; // Assuming the Express app is exported from app.ts
import knex from "knex";
import knexConfig from "../src/db/knexfile";
import { Knex } from "knex";

describe("API Data Retrieval", () => {
  let db: Knex;

  beforeAll(async () => {
    // Initialize Knex instance
    db = knex(knexConfig);

    // Clear the "temperatures" table and reset ID sequence
    await db.raw(`TRUNCATE TABLE temperatures RESTART IDENTITY CASCADE`);

    // Insert mock data for testing
    await db.raw(`
      INSERT INTO temperatures (value, created_at)
      VALUES (25.5, '${new Date().toISOString()}')
    `);
  });

  afterAll(async () => {
    // Clean up Knex connection after tests
    await db.destroy();
  });

  test("should retrieve data with correct UTC timestamp format from /api/data", async () => {
    const response = await request(app).get("/api/data").expect(200);

    response.body.data.forEach(
      (entry: { created_at: string; temperature: number }) => {
        // Verify that temperature is a number and created_at is in UTC format
        expect(typeof entry.temperature).toBe("number");
        expect(new Date(entry.created_at).toISOString()).toBe(entry.created_at);
      }
    );
  });
});
