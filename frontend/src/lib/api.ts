const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  tier: string;
  loyaltyPoints: number;
  savedItemsCount: number;
  recentOrdersCount: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: ApiUser;
}

// ─── Sign Up ────────────────────────────────────────────────────────────────
export async function apiSignup(
  name: string,
  email: string,
  password: string
): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

// ─── Sign In ────────────────────────────────────────────────────────────────
export async function apiSignin(
  email: string,
  password: string
): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// ─── Get current user (protected) ──────────────────────────────────────────
export async function apiGetMe(token: string): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ─── Save JWT token ─────────────────────────────────────────────────────────
export const saveToken = (token: string) =>
  localStorage.setItem("lumina_token", token);

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("lumina_token") : null;

export const removeToken = () =>
  localStorage.removeItem("lumina_token");

