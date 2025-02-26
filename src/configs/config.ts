import "dotenv/config";
import path from "path";
import dotenv from "dotenv";

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Add debug logging
console.log("Environment Loading:", {
  current_dir: __dirname,
  env_path: path.resolve(__dirname, "../../.env"),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

class Config {
  readonly APP_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  readonly APP_NAME = process.env.APP_NAME;
  readonly DB_USER = process.env.DB_USER || "db_user";
  readonly DB_PASSWORD = process.env.DB_PASSWORD || "db_password";
  readonly DB_HOST = process.env.DB_HOST || "db_host";
  readonly DB_NAME = process.env.DB_NAME || "db_name";
  readonly DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 8000;
  readonly REDIS_HOST = process.env.REDIS_HOST || "redis_host";
  readonly REDIS_AUTH = process.env.REDIS_AUTH || "redis_auth";
  readonly REDIS_PORT = process.env.REDIS_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 8000;
}

const config = new Config();

export { config };
export default config;
