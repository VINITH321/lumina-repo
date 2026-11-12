"use client";

import React from "react";
import { UserProfile } from "@/types/auth";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Package,
  Award,
  ArrowRight,
  LogOut,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface LoggedInViewProps {
  user: UserProfile;
  onLogout: () => void;
}

export function LoggedInView({ user, onLogout }: LoggedInViewProps) {
  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
      {/* Success banner */}
      <div className="p-3.5 mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold">Authentication Successful &middot; Session Active</span>
        </div>
        <span className="text-[11px] font-mono opacity-80">SSL 256-BIT</span>
      </div>

      {/* User Header Profile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800 text-center sm:text-left">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Welcome back, {user.name}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                {user.email}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-center sm:self-start px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
              {user.tier}
            </span>
          </div>
        </div>
      </div>

      {/* Quick E-Commerce Stats */}
      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-center">
          <div className="text-amber-500 flex justify-center mb-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {user.loyaltyPoints.toLocaleString()}
          </p>
          <p className="text-[11px] text-zinc-500 font-medium">Reward Points</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-center">
          <div className="text-rose-500 flex justify-center mb-1">
            <Heart className="w-5 h-5" />
          </div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {user.savedItemsCount}
          </p>
          <p className="text-[11px] text-zinc-500 font-medium">Wishlist Items</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-center">
          <div className="text-sky-500 flex justify-center mb-1">
            <Package className="w-5 h-5" />
          </div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {user.recentOrdersCount}
          </p>
          <p className="text-[11px] text-zinc-500 font-medium">Orders</p>
        </div>
      </div>

      {/* Member Privileges List */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Active Member Privileges
        </h4>
        <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Complimentary worldwide express shipping on all orders</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Private VIP access to Winter Capsule releases 24h early</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Dedicated concierge customer care with priority handling</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => alert("Redirecting to LUMINA curated catalog...")}
          className="w-full py-3 px-4 bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-semibold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue to Store Collection
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out of Account
        </button>
      </div>
    </div>
  );
}

