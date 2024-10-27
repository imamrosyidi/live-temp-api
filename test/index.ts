import request from "supertest";
import app from "../src/app";
// import mongoose from 'mongoose';
// import Temperature from '../src/models/temperatureModel';

// beforeAll(async () => {
//   await mongoose.connect('mongodb://localhost:27017/temperatureDB_test');
// });

// afterAll(async () => {
//   await Temperature.deleteMany({});
//   await mongoose.connection.close();
// });

describe("Temperature API", () => {
  it("should return a 400 error if start or end date is missing", async () => {
    const res = await request(app).get("/api/temperatures");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Start and end dates are required");
  });

  it("should return temperatures within a time range", async () => {
    const start = new Date();
    const end = new Date(new Date().getTime() + 60000); // +1 minute
    // await new Temperature({ temperature: 25, timestamp: new Date() }).save();

    const res = await request(app)
      .get("/api/temperatures")
      .query({ start: start.toISOString(), end: end.toISOString() });

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
