"use client";

import { useEffect } from "react";
import { ZapOff, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Category page error:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main 
        className="min-h-screen flex flex-col items-center justify-center px-8 pt-28 pb-20 relative overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Subtle ambient red/amber glow to represent error state */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, rgba(186,26,26,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
          {/* Glowing Error Icon */}
          <div 
            className="w-16 h-16 flex items-center justify-center mb-8 bg-red-50 border border-red-200"
            style={{ 
              boxShadow: "0 0 24px 0 rgba(186, 26, 26, 0.15)",
              borderRadius: "0px" 
            }}
          >
            <ZapOff size={28} className="text-[#ba1a1a]" aria-hidden="true" />
          </div>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#999999] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Link href="/" className="hover:text-[#000000] transition-colors">Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-[#666666]">Categories</span>
          </nav>

          {/* Headline */}
          <h1 
            className="text-[28px] leading-[120%] font-semibold text-black tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Quantum interference detected
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-[15px] leading-[160%] text-[#666666] mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We were unable to retrieve the articles for this category due to connection fluctuations. Please try again.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => reset()}
              className="bg-black text-white px-6 py-3.5 text-[13px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
            >
              <RefreshCw size={14} className="animate-spin-slow" aria-hidden="true" />
              Try Again
            </button>
            <Link
              href="/"
              className="bg-transparent border border-black text-black px-6 py-3.5 text-[13px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#f9f9f9] transition-colors text-center"
              style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
