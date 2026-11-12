import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

/*
// ─────────────────────────────────────────────────────────────────────────────
// [COMMENTED OUT] MongoDB Connection (Mongoose)
// ─────────────────────────────────────────────────────────────────────────────
import mongoose from "mongoose";

export const connectMongoDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected → ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
// ─────────────────────────────────────────────────────────────────────────────
*/

// ─── PostgreSQL Pool Configuration ──────────────────────────────────────────
export const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes("localhost")
          ? false
          : { rejectUnauthorized: false },
      }
    : {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "postgres",
        database: process.env.PGDATABASE || "lumina_ecom",
      }
);

// ─── Initialize PostgreSQL Tables ───────────────────────────────────────────
export const connectDB = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log("✅  PostgreSQL connected successfully");
    client.release();

    // Auto-create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        tier VARCHAR(50) DEFAULT 'Silver VIP',
        loyalty_points INT DEFAULT 500,
        saved_items_count INT DEFAULT 0,
        recent_orders_count INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("📦  PostgreSQL 'users' table ready");
  } catch (error) {
    console.error("❌  PostgreSQL connection error:", error);
    console.error("👉  Make sure your DATABASE_URL in backend/.env is set and Postgres is running.");
  }
};

export default connectDB;
