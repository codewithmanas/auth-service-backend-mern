import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

if (!process.env.FRONTEND_BASE_URL) {
  throw new Error("FRONTEND_BASE_URL is not set");
}

export const DB_NAME = "auth-service-db";
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
