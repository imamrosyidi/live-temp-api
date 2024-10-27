import pgPromise, { IDatabase, IMain } from "pg-promise";
import config from "@/configs/config";

const pgp: IMain = pgPromise();

const dbConfig = {
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
};

const db: IDatabase<any> = pgp(dbConfig);

export default db;
