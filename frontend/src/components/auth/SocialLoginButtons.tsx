"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: "google" | "apple" | "github") => Promise<void>;
  disabled?: boolean;
}

export function SocialLoginButtons({ onSocialLogin, disabled }: SocialLoginButtonsProps) {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  const handleProviderClick = async (provider: "google" | "apple" | "github") => {
    try {
      setActiveProvider(provider);
      await onSocialLogin(provider);
    } finally {
      setActiveProvider(null);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Google */}
      <button
        type="button"
        disabled={disabled || !!activeProvider}
        onClick={() => handleProviderClick("google")}
        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-60"
        title="Continue with Google"
      >
        {activeProvider === "google" ? (
          <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>Google</span>
      </button>

      {/* Apple */}
      <button
        type="button"
        disabled={disabled || !!activeProvider}
        onClick={() => handleProviderClick("apple")}
        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-60"
        title="Continue with Apple"
      >
        {activeProvider === "apple" ? (
          <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
        ) : (
          <svg className="w-4 h-4 fill-current text-zinc-900 dark:text-white" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.85-11.89-14.43-6.52-10.12-11.63-21.73-15.34-34.82-3.71-13.09-5.56-25.07-5.56-35.95 0-14.54 3.53-26.49 10.59-35.84 7.06-9.35 16.03-14.19 26.92-14.52 4.12 0 8.92 1.13 14.4 3.4 5.48 2.27 9.27 3.4 11.37 3.4 1.7 0 5.4-1.07 11.08-3.21 5.68-2.14 10.45-3.08 14.33-2.82 12.83.67 22.75 5.3 29.74 13.9-11.19 6.8-16.66 16.2-16.42 28.2.24 9.4 3.84 17.27 10.8 23.6 6.96 6.33 15.17 9.87 24.63 10.63-2.18 6.53-4.7 13.04-7.56 19.53zM119.22 31.8c0-7.39 2.65-14.4 7.95-21.03 5.3-6.63 11.89-10.77 19.78-12.43 1.05 7.61-.83 14.76-5.63 21.46-4.8 6.7-11.61 10.87-20.43 12.5-.53-.17-1.12-.27-1.67-.5z" />
          </svg>
        )}
        <span>Apple</span>
      </button>

      {/* GitHub */}
      <button
        type="button"
        disabled={disabled || !!activeProvider}
        onClick={() => handleProviderClick("github")}
        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-60"
        title="Continue with GitHub"
      >
        {activeProvider === "github" ? (
          <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
        ) : (
          <svg className="w-4 h-4 fill-current text-zinc-900 dark:text-white" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        )}
        <span>GitHub</span>
      </button>
    </div>
  );
}

