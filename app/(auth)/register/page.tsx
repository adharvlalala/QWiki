"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInWithMagicLink } from "@/app/actions/auth";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(
    signInWithMagicLink,
    undefined
  );

  return (
    <div
      className="min-h-screen w-full grid md:grid-cols-2"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* ── Left: Editorial Typography ──────────────────────────────────── */}
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

      {/* ── Right: Register Form ─────────────────────────────────────────── */}
      <div className="flex flex-col justify-center px-12 py-16">
        <div className="max-w-sm w-full mx-auto">
          {state?.success ? (
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Check your inbox
              </p>
              <h2
                className="text-[32px] font-semibold leading-[120%] tracking-[-0.02em] text-black mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Welcome aboard.
              </h2>
              <p
                className="text-[15px] leading-[165%] text-[#5e5e5e]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We&apos;ve sent a magic link to your email. Click the link to
                complete registration and access your contributor dashboard.
              </p>
            </div>
          ) : (
            <>
              <p
                className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Create account
              </p>

              <form action={action} className="space-y-8" noValidate>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="register-email"
                    className="block text-[11px] uppercase tracking-[0.08em] text-[#666666] mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    className="w-full bg-transparent text-[16px] text-black placeholder:text-[#CCCCCC] outline-none py-2 transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      borderBottom: "1px solid #E5E5E5",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottom = "1px solid #000000";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottom = "1px solid #E5E5E5";
                    }}
                  />
                  {state?.error && (
                    <p
                      className="mt-2 text-[12px] text-black"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {state.error}
                    </p>
                  )}
                </div>

                <button
                  id="register-submit"
                  type="submit"
                  disabled={pending}
                  className="w-full py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {pending ? "Sending…" : "Create Account & Send Link"}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
