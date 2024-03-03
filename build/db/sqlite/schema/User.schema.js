"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    username: (0, sqlite_core_1.text)('username').notNull(),
    fullname: (0, sqlite_core_1.text)('fullname').notNull(),
    email: (0, sqlite_core_1.text)('username').notNull(),
    password: (0, sqlite_core_1.text)('password').notNull()
});
