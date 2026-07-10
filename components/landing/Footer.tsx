"use client";

import { BorderBeam } from "@/registry/magicui/border-beam";

const PARTNERS_DATA: { id: string; name: string; role: string; description: string; isPlatinum?: boolean; isGold?: boolean; isSilver?: boolean; isAcademic?: boolean; image?: string; bgBlack?: boolean; bgWhite?: boolean; imageClassName?: string; url?: string }[] = [
  { id: "p1", name: "ALTOS", role: "Platinum Sponsor", description: "An Acer Group Company.", isPlatinum: true, image: "/images/altos.png", bgBlack: true, url: "https://www.altoscomputing.com/en-IN" },
  { id: "p2", name: "ChatQLM", role: "Gold Sponsor", description: "Driving the future of deep tech and computational boundaries.", isGold: true, image: "/images/chatqlm.png", bgWhite: true, url: "https://www.chatqlm.com/" },
  { id: "p3", name: "nanoStuffs", role: "Gold Sponsor", description: "Lets Grow Together!", isGold: true, image: "/images/nanostuffs.png", bgBlack: true, imageClassName: "scale-125 origin-left", url: "https://www.nanostuffs.com/" },
  { id: "p4", name: "ebiz", role: "Silver Sponsor", description: "Emerging Technologies", isSilver: true, image: "/images/ebiz.png", bgWhite: true, imageClassName: "scale-150 translate-x-3" },
  { id: "p5", name: "IIIT Kottayam", role: "Academic Sponsor", description: "Indian Institute of Information Technology Kottayam", isAcademic: true, image: "/images/iiit-kottayam.jpg", bgWhite: true, url: "https://www.iiitkottayam.ac.in" },
];

export default function Footer({ hidePartners = false }: { hidePartners?: boolean }) {
  const PLATINUM_SPONSORS = PARTNERS_DATA.filter((p) => p.isPlatinum);
  const GOLD_SPONSORS = PARTNERS_DATA.filter((p) => p.isGold);
  const SILVER_SPONSORS = PARTNERS_DATA.filter((p) => p.isSilver);
  const ACADEMIC_SPONSORS = PARTNERS_DATA.filter((p) => p.isAcademic);

  return (
    <footer
      aria-label="Quantum Tech Matrix footer"
      className="relative animate-fade-up"
      style={{ backgroundColor: "#090710", borderTop: "1px solid #333333" }}
    >
      {!hidePartners && (
        <section
          aria-labelledby="qtm-partners-heading"
          className="py-16 md:py-24 border-b border-[#333333]"
        >
          <div className="max-w-[1100px] mx-auto px-6 md:px-8 mb-12">
            <p
              className="text-[11px] font-black uppercase tracking-[0.25em] mb-2"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
            >
              — 06 / Partners
            </p>
            <h2
              id="qtm-partners-heading"
              className="text-[32px] md:text-[42px] font-black tracking-[-0.02em] text-white uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our <span style={{ color: "#7B2FBE" }}>Partners</span>
            </h2>
          </div>

          <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex flex-col gap-10">
            {PLATINUM_SPONSORS.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-6 justify-center">
                  {PLATINUM_SPONSORS.map((p, idx) => (
                    <a
                      key={p.id}
                      href={p.url || "#"}
                      target={p.url ? "_blank" : undefined}
                      rel={p.url ? "noopener noreferrer" : undefined}
                      className={`w-full max-w-[360px] h-[160px] border transition-all duration-500 rounded-md p-6 flex flex-col justify-between group relative overflow-hidden bg-black border-[#222222] hover:border-[#ffffff]/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] ${p.url ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <BorderBeam
                        size={140}
                        duration={3}
                        delay={idx * 0.4}
                        colorFrom="#ffffff"
                        colorTo="#94a3b8"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="flex items-center justify-end">
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#E2E8F0] bg-white/10 px-2 py-0.5 rounded-sm font-[family-name:var(--font-display)]">
                          {p.role}
                        </span>
                      </div>
                      <div className="w-full h-[80px] flex items-end">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-[95%] object-contain filter group-hover:brightness-125 transition-all duration-300" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[120px] bg-[#ffffff]/15 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {GOLD_SPONSORS.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[740px] mx-auto w-full">
                  {GOLD_SPONSORS.map((p, idx) => (
                    <a
                      key={p.id}
                      href={p.url || "#"}
                      target={p.url ? "_blank" : undefined}
                      rel={p.url ? "noopener noreferrer" : undefined}
                      className={`h-[120px] border transition-all duration-500 rounded-md p-4 flex flex-col justify-between group relative overflow-hidden ${p.bgWhite ? "bg-white border-[#e5e5e5]" : "bg-black border-[#222222]"} hover:border-[#FFD700]/50 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] ${p.url ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <BorderBeam
                        size={100}
                        duration={4}
                        delay={idx * 0.4}
                        colorFrom="#FFD700"
                        colorTo="#FFA500"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="flex items-center justify-end">
                        <span className={`text-[8px] font-bold uppercase tracking-[0.15em] ${p.bgWhite ? "text-[#B8860B]" : "text-[#FFD700]"} font-[family-name:var(--font-display)]`}>
                          {p.role}
                        </span>
                      </div>
                      <div className="w-full h-[60px] flex items-end">
                        <img src={p.image} alt={p.name} className={`max-h-full max-w-[95%] object-contain filter group-hover:brightness-125 transition-all duration-300 ${p.imageClassName || ""}`} />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[90px] bg-[#FFD700]/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {(SILVER_SPONSORS.length > 0 || ACADEMIC_SPONSORS.length > 0) && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-6 justify-center">
                  {SILVER_SPONSORS.map((p, idx) => (
                    <a
                      key={p.id}
                      href={p.url || "#"}
                      target={p.url ? "_blank" : undefined}
                      rel={p.url ? "noopener noreferrer" : undefined}
                      className={`w-[240px] h-[95px] border transition-all duration-500 rounded-md p-3 flex flex-col justify-between group relative overflow-hidden bg-white border-[#e5e5e5] hover:border-[#C0C0C0]/50 hover:shadow-[0_0_20px_rgba(192,192,192,0.3)] ${p.url ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <BorderBeam
                        size={80}
                        duration={4.5}
                        delay={idx * 0.4}
                        colorFrom="#C0C0C0"
                        colorTo="#808080"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="flex items-center justify-end">
                        <span className="text-[7.5px] font-bold uppercase tracking-[0.15em] text-[#737373] font-[family-name:var(--font-display)]">
                          {p.role}
                        </span>
                      </div>
                      <div className="w-full h-[45px] flex items-end">
                        <img src={p.image} alt={p.name} className={`max-h-full max-w-[95%] object-contain filter group-hover:brightness-125 transition-all duration-300 ${p.imageClassName || ""}`} />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[70px] bg-[#C0C0C0]/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </a>
                  ))}
                  {ACADEMIC_SPONSORS.map((p, idx) => (
                    <a
                      key={p.id}
                      href={p.url || "#"}
                      target={p.url ? "_blank" : undefined}
                      rel={p.url ? "noopener noreferrer" : undefined}
                      className={`w-[240px] h-[95px] border transition-all duration-500 rounded-md p-3 flex flex-col justify-between group relative overflow-hidden bg-white border-[#e5e5e5] hover:border-[#93C5FD]/50 hover:shadow-[0_0_20px_rgba(147,197,253,0.3)] ${p.url ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <BorderBeam
                        size={80}
                        duration={4.5}
                        delay={idx * 0.4}
                        colorFrom="#93C5FD"
                        colorTo="#60A5FA"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="flex items-center justify-end">
                        <span className="text-[7.5px] font-bold uppercase tracking-[0.15em] text-[#737373] font-[family-name:var(--font-display)]">
                          {p.role}
                        </span>
                      </div>
                      <div className="w-full h-[45px] flex items-end">
                        <img src={p.image} alt={p.name} className={`max-h-full max-w-[95%] object-contain filter group-hover:brightness-125 transition-all duration-300 ${p.imageClassName || ""}`} />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[70px] bg-[#93C5FD]/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="max-w-[1100px] mx-auto px-6 md:px-8 mt-8">
            <p
              className="text-[13px]"
              style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
            >
              Interested in sponsoring?{" "}
              <a
                href="https://wa.me/917510630753"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline transition-all"
                style={{ color: "#00fa9a" }}
              >
                CONTACT US
              </a>
            </p>
          </div>
        </section>
      )}

      <div style={{ height: "1px", backgroundColor: "#333333" }} />

      <div className="px-6 md:px-8 py-16 max-w-[1100px] mx-auto flex flex-col gap-10">

        <div className="flex flex-row items-center justify-between gap-4 md:gap-10">
          <div
            className="font-black select-none leading-[1.15] md:leading-[1.1] tracking-[-0.04em] pr-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 8vw, 88px)",
              color: "#090710",
              textShadow: "-1px -1px 0 #333333, 1px -1px 0 #333333, -1px 1px 0 #333333, 1px 1px 0 #333333",
            }}
            aria-label="Quantum Tech Matrix"
          >
            QUANTUM<br />TECH MATRIX
          </div>

          <div className="w-48 h-48 md:w-72 md:h-72 flex-shrink-0 translate-y-5 md:translate-y-10">
            <img
              src="/images/logo_only.png"
              alt="Quantum Tech Matrix Logo"
              className="w-full h-full object-contain opacity-80"
              style={{ filter: "url(#outline)" }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p
              className="text-[12px] uppercase tracking-[0.15em]"
              style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
            >
              Organized by{" "}
              <a
                href="https://mulearn.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black hover:underline transition-all"
                style={{ color: "#FFFFFF" }}
              >
                MuLearn
              </a>{" "}
              · Quantum Technologies IG
            </p>

            <div
              className="text-[11px] uppercase tracking-[0.12em] flex flex-col sm:flex-row gap-2 sm:gap-4"
              style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
            >
              <span className="font-black">Contact:</span>
              <a
                href="https://wa.me/918921915789"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Adharvlal <span style={{ color: "#7B2FBE" }}>+91 89219 15789</span>
              </a>
              <span className="hidden sm:inline text-[#333333]">|</span>
              <a
                href="https://wa.me/917510630753"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Akhila Sunesh <span style={{ color: "#7B2FBE" }}>+91 75106 30753</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid #333333" }}
        >
          <p
            className="text-[11px]"
            style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
          >
            © {new Date().getFullYear()} MuLearn Quantum Technologies IG · All rights reserved
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 bg-[#00fa9a]" aria-hidden="true" />
          </div>
        </div>

      </div>
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="outline">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="1" />
            <feComposite in="DILATED" in2="SourceAlpha" operator="out" result="OUTLINE" />
            <feFlood floodColor="#333333" result="COLOR" />
            <feComposite in="COLOR" in2="OUTLINE" operator="in" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}
