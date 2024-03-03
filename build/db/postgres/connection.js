"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const envConfigs_1 = require("../../config/envConfigs");
const node_postgres_1 = require("drizzle-orm/node-postgres");
class PostgresConnectionSingleton {
    constructor() {
        // Private constructor to prevent instantiation from outside the class.
        this.db = undefined;
    }
    static async getInstance() {
        // Create a new instance only if one doesn't already exist.
        if (!PostgresConnectionSingleton.instance) {
            PostgresConnectionSingleton.instance = new PostgresConnectionSingleton();
            await PostgresConnectionSingleton.instance.connect();
        }
        return PostgresConnectionSingleton.instance;
    }
    async connect() {
        const client = new pg_1.Client(envConfigs_1.ENV_COFIGS.postgresConfig);
        await client.connect();
        this.db = (0, node_postgres_1.drizzle)(client);
    }
}
PostgresConnectionSingleton.instance = null;
exports.default = PostgresConnectionSingleton;
