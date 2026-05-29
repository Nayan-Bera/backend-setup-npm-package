// db/schema/users.ts
import { pgTable, uuid, varchar, timestamp, boolean } from "drizzle-orm/pg-core";


const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNo: varchar("phone_no", { length: 20 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  is_email_verified: boolean("is_email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



export default users;
