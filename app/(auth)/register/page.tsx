"use client";

import Link from "next/link";
import { signInWithGoogle } from "@/app/actions/auth";

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

        <div className="space-y-2">
          <p
            className="text-[12px] text-[#999999]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            01. Submit article for review
          </p>
          <p
            className="text-[12px] text-[#999999]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            02. Editorial team reviews
          </p>
          <p
            className="text-[12px] text-[#999999]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            03. Published to the wiki
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-12 py-16">
        <div className="max-w-sm w-full mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Create account
          </p>

          <form action={signInWithGoogle} className="space-y-8" noValidate>
            <button
              id="register-submit"
              type="submit"
              className="w-full py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 flex items-center justify-center gap-3"
              style={{
                backgroundColor: "#000000",
                borderRadius: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p
            className="mt-8 text-[13px] text-[#666666]"
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
