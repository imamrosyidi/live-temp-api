import config from "./../configs/config";

module.exports = {
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
