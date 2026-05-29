import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../config/index.js";
import {
user
} from "./schema/index.js";


const schema = {
  user,
} as const;

const sql = postgres(config.DB_URL || "", { max: 1 });
const db = drizzle(sql, { schema, logger: false });

export default db;
