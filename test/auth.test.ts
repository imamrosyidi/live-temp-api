import request from "supertest";
import app from "../src/app/app";

describe("Auth data", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  xit("should register user", async () => {
    const rawResponse = await request(app).post("/auth/register");
    console.log("🚀 ~ it ~ rawResponse:", rawResponse.text);
    console.log("🚀 ~ it ~ rawResponse:", rawResponse.status);
    expect(rawResponse.status).toBe(200);
  });
});
