"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Gift, AlertCircle } from "lucide-react";
import { FormErrors, UserProfile } from "@/types/auth";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { apiSignup, saveToken, ApiUser } from "@/lib/api";

interface RegisterFormProps {
  onSuccess: (user: UserProfile) => void;
  onSwitchToSignin: () => void;
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

export function RegisterForm({ onSuccess, onSwitchToSignin }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Unbreakable"];
  const strengthColors = ["bg-zinc-200 dark:bg-zinc-700", "bg-rose-500", "bg-amber-500", "bg-emerald-500", "bg-emerald-600"];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.terms = "You must agree to the terms to proceed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});

    try {
      const data = await apiSignup(name, email, password);

      if (!data.success || !data.user) {
        setErrors({ general: data.message || "Registration failed. Please try again." });
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

  const handleSocialRegister = async (provider: "google" | "apple" | "github") => {
    alert(`${provider} OAuth will be integrated with Passport.js / NextAuth in the next sprint.`);
  };

  return (
    <div className="w-full">
      {/* Welcome bonus banner */}
      <div className="mb-5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Gift className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <span className="font-bold">Welcome Privilege:</span> Receive 500 Loyalty Points + 15% Off Your First Order.
        </div>
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errors.general}</div>
        </div>
      )}

      <SocialLoginButtons onSocialLogin={handleSocialRegister} disabled={isLoading} />

      <div className="relative my-6 flex items-center justify-center">
        <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
        <span className="bg-white dark:bg-zinc-900 px-3 text-xs uppercase tracking-wider text-zinc-400 font-medium absolute">
          Or sign up with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="register-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input id="register-name" type="text" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }} placeholder="Elena Vance" className={`w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${errors.name ? "border-rose-400 focus:ring-rose-400" : "border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`} />
          </div>
          {errors.name && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="register-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input id="register-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }} placeholder="elena@example.com" className={`w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${errors.email ? "border-rose-400 focus:ring-rose-400" : "border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`} />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="register-password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }} placeholder="Minimum 8 characters" className={`w-full pl-10 pr-11 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${errors.password ? "border-rose-400 focus:ring-rose-400" : "border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {password.length > 0 && (
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">Security strength:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{strengthLabels[strength]}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`rounded-full transition-all duration-300 ${step <= strength ? strengthColors[strength] : "bg-zinc-200 dark:bg-zinc-800"}`} />
                ))}
              </div>
            </div>
          )}
          {errors.password && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="register-confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input id="register-confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: undefined })); }} placeholder="Repeat your password" className={`w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${errors.confirmPassword ? "border-rose-400 focus:ring-rose-400" : "border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`} />
          </div>
          {errors.confirmPassword && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.confirmPassword}</p>}
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
          <input type="checkbox" checked={agreeTerms} onChange={(e) => { setAgreeTerms(e.target.checked); if (errors.terms) setErrors((p) => ({ ...p, terms: undefined })); }} className="mt-0.5 w-4 h-4 rounded border-zinc-300 dark:border-zinc-700" />
          <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
            I agree to LUMINA&apos;s{" "}
            <a href="#" className="underline font-medium text-zinc-800 dark:text-zinc-200 hover:text-amber-500">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline font-medium text-zinc-800 dark:text-zinc-200 hover:text-amber-500">Privacy Policy</a>.
          </span>
        </label>
        {errors.terms && <p className="text-xs text-rose-500 font-medium">{errors.terms}</p>}

        {/* Submit */}
        <button type="submit" disabled={isLoading} className="w-full mt-3 py-3 px-4 bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-semibold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer">
          {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Creating Account...</>) : (<>Create VIP Account<ArrowRight className="w-4 h-4" /></>)}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToSignin} className="font-semibold text-zinc-900 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
            Sign in <ArrowRight className="w-3 h-3" />
          </button>
        </p>
      </div>
    </div>
  );
}
