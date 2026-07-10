import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QWiki — Sign In",
  description: "Sign in to QWiki to contribute to the quantum knowledge base.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
