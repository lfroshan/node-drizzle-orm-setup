import {
  pgTable,
  varchar,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export const User = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 30 }).notNull().unique(),
  fullname: varchar('fullname', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 200 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: varchar('updated_at', { length: 30 }),
});
