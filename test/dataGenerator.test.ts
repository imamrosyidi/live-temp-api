import temperatureService from "./../src/app/services/temperature.service";

describe("Mock Data Generation", () => {
  it("should generate valid mock data with correct timestamp format", () => {
    const mockData = temperatureService.generateTemperature();

    expect(typeof mockData.value).toBe("number");
    expect(new Date(mockData.created_at).toISOString()).toBe(
      mockData.created_at
    );
  });
});
