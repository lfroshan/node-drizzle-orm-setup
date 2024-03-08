import {
  uuid,
  varchar,
  pgTable,
  timestamp
} from "drizzle-orm/pg-core";
import { User } from "./user.schema";

export const UserToken = pgTable('user_token', {
  id: uuid('id').defaultRandom().primaryKey(),
  token: varchar('token', { length: 400 }).notNull(),
  userId: uuid('user_id').references(() => User.id).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: varchar('updated_at', { length: 30 }),
});
