import { Temperature } from "@/app/models/temperature.model";
import { TemperatureRepository } from "@/app/repository/temperature.repository";

class TemperatureService {
  generateTemperature() {
    const value = Math.floor(Math.random() * 15) + 20;
    const created_at = new Date().toISOString();
    return { value, created_at };
  }

  async generateAndInsertTemperature(): Promise<Temperature> {
    const temperature = this.generateTemperature();
    await TemperatureRepository.addTemperature(temperature);
    return temperature;
  }

  async getTemperaturesInRange(munites: number): Promise<Temperature[]> {
    return TemperatureRepository.getTemperaturesInRange(munites);
  }
}

export default new TemperatureService();
