import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  IUser,
  findUserByEmail,
  findUserById,
  createUser,
  comparePassword,
} from "../models/User";

// ─── Helper: sign JWT ───────────────────────────────────────────────────────
const signToken = (id: string | number): string => {
  return jwt.sign({ id: String(id) }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  } as jwt.SignOptions);
};

// ─── Helper: build safe user payload (no password) ──────────────────────────
const buildUserPayload = (user: IUser) => ({
  id: String(user.id),
  name: user.name,
  email: user.email,
  tier: user.tier,
  loyaltyPoints: user.loyaltyPoints,
  savedItemsCount: user.savedItemsCount,
  recentOrdersCount: user.recentOrdersCount,
});

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/signup (PostgreSQL)
// ══════════════════════════════════════════════════════════════════════════════
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Basic presence validation
  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: "Name, email, and password are required." });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    return;
  }

  try {
    // Check duplicate email
    const existing = await findUserByEmail(email);
    if (existing) {
      res.status(409).json({ success: false, message: "An account with this email already exists." });
      return;
    }

    // Create user in PostgreSQL
    const user = await createUser({ name, email, password });
    const token = signToken(user.id);

    res.status(201).json({
      success: true,
      message: "Account created successfully! Welcome to LUMINA.",
      token,
      user: buildUserPayload(user),
    });
  } catch (error: any) {
    console.error("[PostgreSQL signup error]", error);

    // PostgreSQL unique_violation error code is 23505
    if (error?.code === "23505") {
      res.status(409).json({ success: false, message: "An account with this email already exists." });
      return;
    }

    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/signin (PostgreSQL)
// ══════════════════════════════════════════════════════════════════════════════
export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Email and password are required." });
    return;
  }

  try {
    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const token = signToken(user.id);

    res.status(200).json({
      success: true,
      message: "Signed in successfully. Welcome back!",
      token,
      user: buildUserPayload(user),
    });
  } catch (error) {
    console.error("[PostgreSQL signin error]", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/auth/me (PostgreSQL protected route — requires JWT)
// ══════════════════════════════════════════════════════════════════════════════
export const getMe = async (req: Request & { userId?: string }, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const user = await findUserById(req.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({ success: true, user: buildUserPayload(user) });
  } catch (error) {
    console.error("[PostgreSQL getMe error]", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
