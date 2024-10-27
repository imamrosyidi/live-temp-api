import config from "./../configs/config";

const knexConfig = {
  client: "pg",
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
  },
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
};

export default knexConfig;
