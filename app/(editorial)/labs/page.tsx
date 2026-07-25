import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Labs — Coming Soon | QWiki",
  description:
    "QWiki Labs is under construction. Experimental tools, simulations, and interactive quantum computing resources are on the way.",
};

export default function LabsPage() {
  return (
    <>
      <Navbar />

      <main
        className="min-h-screen flex flex-col items-center justify-between pt-28 pb-8 px-8 relative overflow-hidden bg-white"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Glowing background accent for futuristic feel */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(126,34,206,0.06) 0%, transparent 65%)",
          }}
        />

        {/* Main Content Layout */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full relative z-10 py-12">
          {/* Status Label */}
          <p
            className="text-[12px] leading-[100%] tracking-[0.15em] font-semibold text-[#7e22ce] uppercase mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            STATUS — IN DEVELOPMENT
          </p>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6 leading-tight uppercase font-display text-center"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Quantum <span className="text-[#7e22ce]">Labs</span>
          </h1>

          {/* Divider */}
          <div
            className="h-[1px] w-20 mx-auto mb-8"
            style={{ backgroundColor: "#E5E5E5" }}
          />

          {/* Description */}
          <p
            className="text-[16px] md:text-[18px] leading-[160%] text-[#5e5e5e] text-center max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Interactive quantum simulations, experimental computational tools,
            and research sandboxes are currently under construction. This space
            will house hands-on resources for learning and experimentation.
          </p>

          {/* Features container */}
          <div 
            className="border border-[#E5E5E5] bg-[#FAFAFA] max-w-md w-full mx-auto mb-10 overflow-hidden divide-y divide-[#E5E5E5]"
            style={{ borderRadius: "0px" }}
          >
            {[
              "Quantum Circuit Simulator",
              "Entanglement Visualizer",
              "Algorithm Playground",
              "Research Notebooks",
            ].map((item, i) => (
              <div
                key={item}
                className="flex justify-between items-center py-4 px-6 hover:bg-white transition-colors duration-200"
              >
                <span
                  className="text-[14px] md:text-[15px] text-[#1b1b1b] font-medium"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}. {item}
                </span>
                <span
                  className="text-[10px] font-bold tracking-wider text-[#7e22ce] bg-[#7e22ce]/8 border border-[#7e22ce]/15 px-2.5 py-0.5 uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
                >
                  Soon
                </span>
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
            <Link
              href="/"
              className="flex-1 bg-black text-white px-8 py-3.5 text-[12px] leading-[100%] tracking-[0.05em] font-semibold uppercase hover:bg-neutral-800 transition-colors text-center"
              style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
            >
              Back to Wiki
            </Link>
            <Link
              href="/about"
              className="flex-1 bg-transparent border border-[#cfc4c5] text-[#5e5e5e] px-8 py-3.5 text-[12px] leading-[100%] tracking-[0.05em] font-semibold uppercase hover:border-black hover:text-black hover:bg-[#f9f9f9] transition-colors text-center"
              style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
            >
              About the Initiative
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p
          className="text-[12px] text-[#999999] relative z-10 text-center mt-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          © 2025 QWiki · CC BY 4.0
        </p>
      </main>
    </>
  );
}
