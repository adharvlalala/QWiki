import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Labs — Coming Soon | QWiki",
  description:
    "QWiki Labs is under construction. Experimental tools, simulations, and interactive quantum computing resources are on the way.",
};

export default function LabsPage() {
  return (
    <>
      {/* Material Symbols font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex flex-col items-center justify-center px-8"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative label */}
          <p
            className="text-[14px] leading-[100%] tracking-[0.02em] font-medium text-[#5e5e5e] uppercase mb-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Status — In Development
          </p>

          {/* Main heading */}
          <h1
            className="text-[72px] leading-[110%] tracking-[-0.03em] font-semibold text-black mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Labs.
          </h1>

          {/* Divider */}
          <div
            className="h-[1px] w-24 mx-auto mb-8"
            style={{ backgroundColor: "#E5E5E5" }}
          />

          {/* Description */}
          <p
            className="text-[18px] leading-[160%] text-[#4c4546] max-w-lg mx-auto mb-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Interactive quantum simulations, experimental computational tools,
            and research sandboxes are currently under construction. This space
            will house hands-on resources for learning and experimentation.
          </p>

          {/* Feature list */}
          <div className="border-t border-[#E5E5E5] max-w-md mx-auto mb-12">
            {[
              "Quantum Circuit Simulator",
              "Entanglement Visualizer",
              "Algorithm Playground",
              "Research Notebooks",
            ].map((item, i) => (
              <div
                key={item}
                className="flex justify-between items-center py-4 border-b border-[#E5E5E5] px-2"
              >
                <span
                  className="text-[16px] leading-[160%] text-[#1b1b1b] font-medium"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}. {item}
                </span>
                <span
                  className="text-[14px] leading-[100%] tracking-[0.02em] font-medium text-[#5e5e5e] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Soon
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] transition-colors text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Back to Wiki
            </Link>
            <Link
              href="/about"
              className="bg-transparent border border-black text-black px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#f9f9f9] transition-colors text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              About the Initiative
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p
          className="absolute bottom-8 text-[14px] text-[#666666]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          © 2025 QWiki · CC BY 4.0
        </p>
      </div>
    </>
  );
}
