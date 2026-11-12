"use client";

import React, { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import { LoggedInView } from "@/components/auth/LoggedInView";
import { AuthMode, UserProfile } from "@/types/auth";
import {
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Shield,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleOpenForgot = (email?: string) => {
    if (email) setForgotEmail(email);
    setIsForgotModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200`}>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-base shadow-sm">
              L
            </div>
            <div>
              <span className="font-serif text-lg tracking-wider font-bold block leading-none">
                LUMINA
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block font-sans">
                Fine Goods &bull; Est. 2026
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Help Link */}
            <button
              onClick={() => alert("Concierge Help: Contact 24/7 client care at concierge@lumina.luxury")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Assistance</span>
            </button>

            {/* Return to store / Cart preview */}
            <button
              onClick={() => alert("Cart has 2 items reserved ($420.00). Complete sign in to apply member discounts.")}
              className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Guest Bag</span>
              <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex items-stretch">
        <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
          {/* Left Column: Form Container */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-10 lg:py-16 max-w-xl mx-auto w-full">
            {currentUser ? (
              <LoggedInView user={currentUser} onLogout={handleLogout} />
            ) : (
              <div className="w-full max-w-md">
                {/* Header Title */}
                <div className="mb-6 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
                    <Sparkles className="w-3 h-3" />
                    Member Privilege Portal
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {authMode === "signin" ? "Welcome back" : "Become a member"}
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    {authMode === "signin"
                      ? "Access your saved bag, priority shipping, and member rewards."
                      : "Join today to claim your 500 welcome points and complimentary express freight."}
                  </p>
                </div>

                {/* Mode Selector Tabs */}
                <div className="flex p-1 mb-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${authMode === "signin"
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                      }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${authMode === "signup"
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                      }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Form Render */}
                {authMode === "signin" ? (
                  <LoginForm
                    onSuccess={handleLoginSuccess}
                    onForgotPassword={handleOpenForgot}
                    onSwitchToSignup={() => setAuthMode("signup")}
                  />
                ) : (
                  <RegisterForm
                    onSuccess={handleLoginSuccess}
                    onSwitchToSignin={() => setAuthMode("signin")}
                  />
                )}
              </div>
            )}
          </div>

          {/* Right Column: Hero Showcase (Desktop only) */}
          <div className="hidden lg:block lg:w-1/2 xl:w-7/12 relative">
            <AuthShowcase />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 py-4 px-4 sm:px-8 text-xs text-zinc-400 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>&copy; {new Date().getFullYear()} LUMINA Luxury Atelier. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Privacy Notice
            </a>
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Authenticity Guarantee
            </a>
            <span className="font-mono text-zinc-400">USD ($)</span>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        defaultEmail={forgotEmail}
      />
    </div>
  );
}
