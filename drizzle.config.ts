import { Config } from 'drizzle-kit';

export default {
  schema: "./src/db/postgres/schema/*",
  out: "./src/drizzle",
  driver: 'pg',
  dbCredentials: {
    host: process.env.HOST as string,
    port: parseInt(process.env.DB_PORT ?? '') as number,
    password: process.env.PASSWORD as string,
    database: process.env.DATABASE as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
