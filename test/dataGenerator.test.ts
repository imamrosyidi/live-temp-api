import { generateDummyTemperature } from "@/services/temperatureService";

describe("Mock Data Generation", () => {
  it("should generate valid mock data with correct timestamp format", () => {
    const mockData = generateDummyTemperature();

    expect(typeof mockData.value).toBe("number");
    expect(new Date(mockData.created_at).toISOString()).toBe(
      mockData.created_at
    );
  });
});
