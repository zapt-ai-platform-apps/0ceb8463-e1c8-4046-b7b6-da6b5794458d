import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  dialect: "pg",
  schema: "./drizzle/schema.js",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.NEON_DB_URL,
  },
});