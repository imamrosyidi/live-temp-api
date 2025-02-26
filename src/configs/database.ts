import pgPromise, { IDatabase, IMain } from "pg-promise";
import config from "@/configs/config";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset";

class Database {
  private static instance: IDatabase<any>;

  private constructor() {} // Prevent instantiation

  public static getInstance(): IDatabase<any> {
    if (!Database.instance) {
      const pgp: IMain = pgPromise({
        connect(e) {
          const { database, host, port } = e.client.connectionParameters;
          console.log(`Connected to database ${database} at ${host}:${port}`);
        },
        disconnect(e) {
          const { database, host, port } = e.client.connectionParameters;
          console.log(
            `Disconnected from database ${database} at ${host}:${port}`
          );
        },
      });

      const dbConfig: IConnectionParameters = {
        host: config.DB_HOST,
        port: config.DB_PORT,
        database: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        application_name: config.APP_NAME,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      };

      Database.instance = pgp(dbConfig);
    }
    return Database.instance;
  }
}

export default Database.getInstance();
