"use client";

import Link from "next/link";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  return (
    <div
      className="min-h-screen w-full grid md:grid-cols-2"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col justify-between px-12 py-16 border-r border-[#E5E5E5]">
        {/* Brand */}
        <Link
          href="/"
          className="text-[13px] font-medium uppercase tracking-[0.08em] text-black hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:underline"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ← QWIKI
        </Link>

        {/* Hero headline */}
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Contributor Portal
          </p>
          <h1
            className="text-black leading-[110%] tracking-[-0.04em] mb-8"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 64px)",
              fontWeight: 700,
            }}
          >
            The Quantum
            <br />
            Knowledge Base.
            <br />
            <span style={{ color: "#000000" }}>Open to All.</span>
          </h1>
          <p
            className="text-[16px] leading-[170%] text-[#5e5e5e] max-w-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sign in with Google to access your contributor dashboard,
            submit articles, and track your editorial pipeline.
          </p>
        </div>

        <div />
      </div>

      <div className="flex flex-col justify-center px-12 py-16">
        <div className="max-w-sm w-full mx-auto">
          {/* Auth error from callback */}
          {authError && (
            <div
              className="mb-8 py-3 text-[13px] text-[#000000]"
              style={{
                borderLeft: "2px solid #000000",
                paddingLeft: "16px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Sign-in was invalid or expired. Please try again.
            </div>
          )}

          <p
            className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sign in
          </p>

          <GoogleSignInButton />

          {/* Register link */}
          <p
            className="mt-4 text-[13px] text-[#666666]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            New to QWiki?{" "}
            <Link
              href="/register"
              className="text-black underline underline-offset-4 hover:opacity-60 transition-opacity focus-visible:outline-none"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
