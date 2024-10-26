import "dotenv/config";

class Config {
  readonly APP_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  readonly DB_USER = process.env.DB_USER || "db_user";
  readonly DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 8000;
  readonly DB_NAME = process.env.DB_NAME || "db_name";
  readonly DB_HOST = process.env.DB_HOST || "db_host";
  readonly DB_PASSWORD = process.env.DB_PASSWORD || "db_password";
}

const config = new Config();

export { config };
export default config;
