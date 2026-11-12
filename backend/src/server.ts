import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

// ─── Load env variables ─────────────────────────────────────────────────────
dotenv.config();

// ─── Connect to MongoDB ─────────────────────────────────────────────────────
connectDB();

// ─── Create Express App ─────────────────────────────────────────────────────
const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "LUMINA API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── 404 handler ───────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Start Server ───────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`\n🛍️  LUMINA API running on http://localhost:${PORT}`);
  console.log(`📋  Auth endpoints:`);
  console.log(`    POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`    POST http://localhost:${PORT}/api/auth/signin`);
  console.log(`    GET  http://localhost:${PORT}/api/auth/me  (protected)\n`);
});

export default app;

