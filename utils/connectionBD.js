import myslq from "mysql2/promise";
import {
  DB_HOTS,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../utils/config.js";

const config = {
  host: DB_HOTS,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

export const connection = await myslq.createConnection(config);
