import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beyond Classical — Advancing the Quantum Frontier",
  description:
    "A rigorous academic framework dedicated to the fundamental principles and transformative potential of quantum mechanics, computing, and information theory.",
};

export default function EditorialLayout({
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
