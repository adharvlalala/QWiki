import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Quantum Tech Matrix — MuLearn Quantum Technologies IG Launch",
  description:
    "The official launch event of the MuLearn Quantum Technologies Interest Group. A landmark day for quantum computing, mechanics, and Kerala's tech ecosystem.",
  keywords: [
    "quantum tech matrix",
    "mulearn",
    "quantum technologies",
    "quantum computing",
    "kerala quantum",
    "quantum ig launch",
  ],
  openGraph: {
    title: "Quantum Tech Matrix — MuLearn Quantum Technologies IG Launch",
    description:
      "Join us for Kerala's first Quantum Technologies IG launch. Keynotes, labs, networking, and more.",
    type: "website",
  },
};

export default function DarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen antialiased relative"
      style={{
        backgroundColor: "#090710",
        color: "#FFFFFF",
        fontFamily: "var(--font-display), 'Inter', sans-serif",
      }}
    >
      {/* CSS Noise Overlay for physical texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
