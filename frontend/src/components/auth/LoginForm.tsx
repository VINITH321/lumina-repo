"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { FormErrors, UserProfile } from "@/types/auth";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { apiSignin, saveToken, ApiUser } from "@/lib/api";

interface LoginFormProps {
  onSuccess: (user: UserProfile) => void;
  onForgotPassword: (email?: string) => void;
  onSwitchToSignup: () => void;
}

function mapApiUser(u: ApiUser): UserProfile {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    tier: u.tier as UserProfile["tier"],
    loyaltyPoints: u.loyaltyPoints,
    savedItemsCount: u.savedItemsCount,
    recentOrdersCount: u.recentOrdersCount,
  };
}

export function LoginForm({ onSuccess, onForgotPassword, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});

    try {
      const data = await apiSignin(email, password);

      if (!data.success || !data.user) {
        setErrors({ general: data.message || "Invalid credentials." });
        return;
      }

      if (data.token) saveToken(data.token);
      onSuccess(mapApiUser(data.user));
    } catch {
      setErrors({ general: "Could not reach the server. Make sure the backend is running on port 5000." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple" | "github") => {
    // Social login: wired to real OAuth provider in a later sprint
    alert(`${provider} OAuth will be integrated with Passport.js / NextAuth in the next sprint.`);
  };

  return (
    <div className="w-full">
      {/* Global Error Banner */}
      {errors.general && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errors.general}</div>
        </div>
      )}

      <SocialLoginButtons onSocialLogin={handleSocialLogin} disabled={isLoading} />

      <div className="relative my-6 flex items-center justify-center">
        <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
        <span className="bg-white dark:bg-zinc-900 px-3 text-xs uppercase tracking-wider text-zinc-400 font-medium absolute">
          Or sign in with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="signin-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${errors.email ? "border-rose-400 focus:ring-rose-400" : "border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="signin-password" className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <button type="button" onClick={() => onForgotPassword(email)} className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="••••••••••••"
              className={`w-full pl-10 pr-11 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${errors.password ? "border-rose-400 focus:ring-rose-400" : "border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" aria-label="Toggle password">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700" />
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Keep me signed in on this device</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 py-3 px-4 bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-semibold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Signing In...</>) : (<>Sign In to Store<ArrowRight className="w-4 h-4" /></>)}
        </button>

        <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Protected with end-to-end 256-bit bank encryption</span>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          New to LUMINA?{" "}
          <button type="button" onClick={onSwitchToSignup} className="font-semibold text-zinc-900 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
            Create your account <ArrowRight className="w-3 h-3" />
          </button>
        </p>
      </div>
    </div>
  );
}
