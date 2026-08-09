import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QWiki — Navigate the Quantum Frontier",
  description:
    "A living knowledge base for quantum computing, physics, and advanced information science. Structured clarity meets quantum-era intelligence.",
  keywords: ["quantum computing", "wiki", "quantum mechanics", "quantum information"],
  authors: [{ name: "QWiki Team" }],
  openGraph: {
    title: "QWiki — Navigate the Quantum Frontier",
    description:
      "A living knowledge base for quantum computing, physics, and advanced information science.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QWiki — Navigate the Quantum Frontier",
    description: "A living knowledge base for quantum computing and advanced physics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${playfairDisplay.variable} h-full`}
    >
      <body className="min-h-full bg-[#f8f9fa] text-[#191c1d] antialiased">
        {children}
      </body>
    </html>
  );
}
