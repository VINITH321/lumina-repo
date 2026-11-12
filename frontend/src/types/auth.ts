export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  tier: "Standard" | "Silver VIP" | "Gold Concierge" | "Platinum Elite";
  loyaltyPoints: number;
  savedItemsCount: number;
  recentOrdersCount: number;
}

export type AuthMode = "signin" | "signup";

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
}

