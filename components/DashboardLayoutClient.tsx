"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

/**
 * Client wrapper for the dashboard layout.
 * Receives server-fetched user data as props and manages
 * the mobile navigation drawer open/close state.
 */
export default function DashboardLayoutClient({
  children,
  userEmail,
  userRole,
}: {
  children: React.ReactNode;
  userEmail: string;
  userRole: string;
}) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <DashboardNav
        userEmail={userEmail}
        userRole={userRole}
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar — hamburger and direct link to home */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] bg-white sticky top-0 z-30">
          <button
            onClick={() => setNavOpen(true)}
            className="p-1.5 -ml-1.5 text-[#191c1d] hover:opacity-60 transition-opacity focus-visible:outline-none"
            aria-label="Open navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          
          <Link
            href="/"
            className="text-[14px] font-bold tracking-tight text-black hover:opacity-60 transition-opacity"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            QWIKI
          </Link>

          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.08em] text-[#666666] hover:text-black font-medium transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ← Wiki
          </Link>
        </div>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
