"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_COFIGS = void 0;
require('dotenv').config();
exports.ENV_COFIGS = {
    port: process.env.PORT,
    postgresConfig: {
        type: process.env.TYPE,
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT ?? ''),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
};
