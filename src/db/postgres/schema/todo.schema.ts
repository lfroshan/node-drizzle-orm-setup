import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { User } from "./user.schema";

const Todo = pgTable("todo", {
  id: uuid("id").defaultRandom().primaryKey(),
  done: boolean("done").default(false),
  title: varchar("title", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }),
  user: uuid("user_id").references(() => User.id).notNull(),
  createdAt: timestamp("created_at", { mode: 'date', withTimezone: false }).default(new Date()),
  updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: false }).default(new Date())
});

export default Todo;
