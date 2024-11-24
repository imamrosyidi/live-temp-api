require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "live-temp-api",
      script: "dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      env_production: {
        NODE_ENV: "production",
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
      },
    },
  ],
};
