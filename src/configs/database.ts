import pgPromise, { IDatabase, IMain } from "pg-promise";
import config from "@/configs/config";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset";

const pgp: IMain = pgPromise({
  connect(e) {
    const { database, host, port } = e.client.connectionParameters;
    console.log(`Connected to database ${database} at ${host}:${port}`);
  },
  disconnect(e) {
    const { database, host, port } = e.client.connectionParameters;
    console.log(`Disconnected from database ${database} at ${host}:${port}`);
  },
});

const dbConfig: IConnectionParameters = {
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
};

const db: IDatabase<any> = pgp(dbConfig);

export default db;
