import bcrypt from "bcryptjs";
import { pool } from "../config/db";

// ─── User Interface ─────────────────────────────────────────────────────────
export interface IUser {
  id: string | number;
  name: string;
  email: string;
  password?: string;
  tier: "Standard" | "Silver VIP" | "Gold Concierge" | "Platinum Elite";
  loyaltyPoints: number;
  savedItemsCount: number;
  recentOrdersCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Map PostgreSQL row (snake_case) to IUser (camelCase) ───────────────────
export const mapRowToUser = (row: any): IUser => ({
  id: String(row.id),
  name: row.name,
  email: row.email,
  password: row.password,
  tier: row.tier,
  loyaltyPoints: row.loyalty_points,
  savedItemsCount: row.saved_items_count,
  recentOrdersCount: row.recent_orders_count,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// ─── Compare Candidate Password with Stored Hash ────────────────────────────
export const comparePassword = async (
  candidate: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(candidate, hash);
};

// ─── PostgreSQL Database Queries ────────────────────────────────────────────
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const result = await pool.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
    [email.trim()]
  );
  if (result.rows.length === 0) return null;
  return mapRowToUser(result.rows[0]);
};

export const findUserById = async (id: string | number): Promise<IUser | null> => {
  const result = await pool.query(
    "SELECT id, name, email, tier, loyalty_points, saved_items_count, recent_orders_count, created_at, updated_at FROM users WHERE id = $1 LIMIT 1",
    [id]
  );
  if (result.rows.length === 0) return null;
  return mapRowToUser(result.rows[0]);
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<IUser> => {
  // Hash password before saving
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, tier, loyalty_points, saved_items_count, recent_orders_count)
     VALUES ($1, $2, $3, 'Silver VIP', 500, 0, 0)
     RETURNING id, name, email, tier, loyalty_points, saved_items_count, recent_orders_count, created_at, updated_at`,
    [name.trim(), email.toLowerCase().trim(), hashedPassword]
  );

  return mapRowToUser(result.rows[0]);
};

/*
// ─────────────────────────────────────────────────────────────────────────────
// [COMMENTED OUT] MongoDB Schema (Mongoose)
// ─────────────────────────────────────────────────────────────────────────────
import mongoose, { Document, Schema } from "mongoose";

export interface IMongoUser extends Document {
  name: string;
  email: string;
  password: string;
  tier: "Standard" | "Silver VIP" | "Gold Concierge" | "Platinum Elite";
  loyaltyPoints: number;
  savedItemsCount: number;
  recentOrdersCount: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IMongoUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    tier: {
      type: String,
      enum: ["Standard", "Silver VIP", "Gold Concierge", "Platinum Elite"],
      default: "Silver VIP",
    },
    loyaltyPoints: { type: Number, default: 500 },
    savedItemsCount: { type: Number, default: 0 },
    recentOrdersCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.pre<IMongoUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const MongoUser = mongoose.models.User || mongoose.model<IMongoUser>("User", UserSchema);
// ─────────────────────────────────────────────────────────────────────────────
*/
