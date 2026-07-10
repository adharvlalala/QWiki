"use client";

import { motion } from "framer-motion";
import QtmNavbar from "@/components/landing/QtmNavbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <QtmNavbar />

      <main 
        id="qtm-privacy-main" 
        className="relative z-10 pt-28 pb-20 min-h-screen"
        style={{ backgroundColor: "#090710" }}
      >
        {/* Page Header */}
        <header className="px-6 md:px-8 pt-16 pb-12 border-b border-[#333333]">
          <div className="max-w-[1100px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[48px] md:text-[64px] leading-[110%] tracking-[-0.03em] font-black text-white uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy <span style={{ color: "#7B2FBE" }}>Policy</span>
            </motion.h1>
            <p className="text-[13px] text-[#A3A3A3] mt-4 tracking-[0.05em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </header>

        {/* Content Section */}
        <section aria-labelledby="policy-content" className="px-6 md:px-8 py-16">
          <div className="max-w-[800px] mx-auto flex flex-col gap-12">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                1. Introduction
              </h2>
              <p className="text-[15px] leading-[160%] text-[#A3A3A3]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Welcome to the Quantum Tech Matrix. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website, register for the event, or participate in our initiatives.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                2. Data We Collect
              </h2>
              <p className="text-[15px] leading-[160%] text-[#A3A3A3]" style={{ fontFamily: "'Inter', sans-serif" }}>
                When you register for our event, we may collect the following types of personal information:
              </p>
              <ul className="list-disc pl-5 text-[15px] leading-[160%] text-[#A3A3A3] space-y-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <li><strong className="text-white">Identity Data:</strong> First name, last name, username, or similar identifier.</li>
                <li><strong className="text-white">Contact Data:</strong> Email address, phone number.</li>
                <li><strong className="text-white">Professional Data:</strong> Affiliation, institution, role, or research interests.</li>
                <li><strong className="text-white">Technical Data:</strong> IP address, browser type and version, time zone setting, operating system and platform.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                3. How We Use Your Data
              </h2>
              <p className="text-[15px] leading-[160%] text-[#A3A3A3]" style={{ fontFamily: "'Inter', sans-serif" }}>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 text-[15px] leading-[160%] text-[#A3A3A3] space-y-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <li>To register you as an attendee for the event.</li>
                <li>To manage our relationship with you, including notifying you about schedule changes or venue details.</li>
                <li>To administer and protect our platform (including troubleshooting, data analysis, testing, and system maintenance).</li>
                <li>To deliver relevant updates and communications related to quantum technologies.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                4. Data Security
              </h2>
              <p className="text-[15px] leading-[160%] text-[#A3A3A3]" style={{ fontFamily: "'Inter', sans-serif" }}>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those organizers and partners who have a legitimate need to know.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                5. Your Legal Rights
              </h2>
              <p className="text-[15px] leading-[160%] text-[#A3A3A3]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data, and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                6. Contact Us
              </h2>
              <p className="text-[15px] leading-[160%] text-[#A3A3A3]" style={{ fontFamily: "'Inter', sans-serif" }}>
                If you have any questions about this privacy policy or our privacy practices, please contact us at our community email or reach out to our organizers directly.
              </p>
            </div>

          </div>
        </section>
      </main>
      
      <Footer hidePartners />
    </>
  );
}
