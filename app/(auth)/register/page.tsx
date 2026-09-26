"use client";

import Link from "next/link";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen w-full grid md:grid-cols-2"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col justify-between px-12 py-16 border-r border-[#E5E5E5]">
        <Link
          href="/"
          className="text-[13px] font-medium uppercase tracking-[0.08em] text-black hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:underline"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ← QWIKI
        </Link>

        <div>
          <p
            className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Join the Initiative
          </p>
          <h1
            className="text-black leading-[110%] tracking-[-0.04em] mb-8"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 64px)",
              fontWeight: 700,
            }}
          >
            Write the
            <br />
            Quantum
            <br />
            Future.
          </h1>
          <p
            className="text-[16px] leading-[170%] text-[#5e5e5e] max-w-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Become a QWiki contributor. Submit articles, receive editorial
            feedback, and help build the definitive quantum knowledge base.
          </p>
        </div>

        <div />
      </div>

      <div className="flex flex-col justify-center px-12 py-16">
        <div className="max-w-sm w-full mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Create account
          </p>

          <GoogleSignInButton />

          <p
            className="mt-4 text-[13px] text-[#666666]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black underline underline-offset-4 hover:opacity-60 transition-opacity focus-visible:outline-none"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
