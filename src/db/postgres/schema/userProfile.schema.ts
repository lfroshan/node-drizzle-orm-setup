import {
  pgTable,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { User } from "./user.schema";

export const UserProfile = pgTable('profile', {
  id: uuid("id").defaultRandom(),
  userId: uuid("user_id").references(() => User.id).notNull().unique(),
  temporaryAddress: varchar("temporary_address", { length: 80 }),
  permanentAddress: varchar("permanent_address", { length: 80 }),
  profilePicture: varchar('profile_picture', { length: 500 }),
  country: varchar('country', { length: 50 }),
  designation: varchar('designation', { length: 200 }),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: false }).default(new Date()),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: false }).default(new Date())
});
