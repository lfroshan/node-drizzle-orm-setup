"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.varchar)('username', { length: 30 }).notNull(),
    fullname: (0, pg_core_1.varchar)('fullname', { length: 50 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull(),
    password: (0, pg_core_1.varchar)('password', { length: 200 }).notNull(),
});
