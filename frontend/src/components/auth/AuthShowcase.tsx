"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, Truck, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "The curated aesthetic and rapid express delivery make LUMINA the finest shopping destination I have experienced.",
    author: "Elena Rostova",
    title: "Verified VIP Member · Milan",
    rating: 5,
  },
  {
    quote: "Authentic craftsmanship, seamless checkout, and members get early access to limited capsule releases.",
    author: "Julian Chen",
    title: "Gold Tier Collector · Tokyo",
    rating: 5,
  },
  {
    quote: "Customer concierge support handled my exchange in under two hours. Unmatched luxury service.",
    author: "Marcus Vance",
    title: "Platinum Shopper · New York",
    rating: 5,
  },
];

export function AuthShowcase() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[activeTestimonial];

  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full p-12 overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-stone-900 text-white">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header / Brand Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-zinc-950 font-bold text-sm shadow-lg shadow-amber-400/20">
            L
          </div>
          <span className="font-semibold tracking-wider text-sm uppercase text-zinc-200">
            LUMINA Atelier
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autumn / Winter Capsule 2026</span>
        </div>
      </div>

      {/* Main Centerpiece Product Card Preview */}
      <div className="relative z-10 my-auto py-8">
        <div className="relative group max-w-lg mx-auto">
          {/* Main Card */}
          <div className="relative rounded-3xl p-6 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/20">
            
            {/* Best Seller Pill */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Staff Pick · Exclusive
              </span>
              <span className="text-xs text-zinc-400 font-mono">EDITION #049</span>
            </div>

            {/* Product Feature Description */}
            <h3 className="text-2xl font-serif tracking-tight text-white font-medium">
              The Nocturne Chronograph
            </h3>
            <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
              Forged grade-5 titanium, sapphire crystal, and perpetual automatic calibre.
            </p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-white">$640</span>
              <span className="text-sm line-through text-zinc-500">$850</span>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800">
                Member -25%
              </span>
            </div>

            {/* Micro Perks Grid */}
            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Complimentary Air Freight</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lifetime Atelier Warranty</span>
              </div>
            </div>
          </div>

          {/* Floating Live Activity Badge */}
          <div className="absolute -bottom-4 -right-4 px-4 py-2.5 bg-zinc-900/90 border border-white/15 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 animate-pulse">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-200">
              47 members shopping now
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Testimonial and Trust Badges */}
      <div className="relative z-10 space-y-6">
        {/* Testimonial slider */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1 text-amber-400 mb-2">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="ml-2 text-xs font-bold text-zinc-300">5.0 Star Rating</span>
          </div>
          <p className="text-sm text-zinc-200 italic leading-relaxed">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">{current.author}</p>
              <p className="text-[11px] text-zinc-400">{current.title}</p>
            </div>
            {/* Pagination dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeTestimonial ? "w-6 bg-amber-400" : "w-1.5 bg-white/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand Assurance Badges */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-white/10 pt-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            100% Authentic Guaranteed
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            256-Bit SSL Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
            Global 48h Delivery
          </span>
        </div>
      </div>
    </div>
  );
}

