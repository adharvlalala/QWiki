import Navbar from "@/components/Navbar";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
        <div className="space-y-8 text-[#191c1d]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mb-4">
              Legal Information
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Terms of Service
            </h1>
            <p className="text-[#5e5e5e] text-sm">Last Updated: August 24, 2026</p>
          </div>

          <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-blue-600 space-y-6">
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                By accessing or using QWiki ("the Site"), you agree to be bound by these Terms of Service. QWiki is a free, open-source, and non-profit educational platform. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. User Contributions & Licensing</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                As an open knowledge base, users may submit content, articles, and edits ("Contributions"). By submitting Contributions to QWiki:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-[#4a4a4a]">
                <li>You grant QWiki a perpetual, worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.</li>
                <li>You agree that your Contributions may be released under an open-source or Creative Commons license (e.g., CC BY-SA 4.0) to benefit the public domain.</li>
                <li>You guarantee that your Contributions do not violate the intellectual property rights, copyrights, or privacy of any third party.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Acceptable Use</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                You agree not to use the Site to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-[#4a4a4a]">
                <li>Post false, misleading, or scientifically inaccurate information intentionally.</li>
                <li>Harass, abuse, or threaten other contributors.</li>
                <li>Distribute spam, malicious software, or attempt to disrupt the platform's infrastructure.</li>
                <li>Violate any applicable local, state, or international laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Disclaimer of Warranties</h2>
              <p className="leading-relaxed text-[#4a4a4a] font-medium">
                THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND.
              </p>
              <p className="leading-relaxed text-[#4a4a4a] mt-2">
                While we strive for accuracy in our quantum physics and science articles, QWiki makes no representations or warranties regarding the completeness, accuracy, reliability, or availability of any information on the platform. The content is for informational and educational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                In no event shall QWiki, its founders, maintainers, or volunteer editors be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Site or the information contained within it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Modifications to Terms</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                We reserve the right to modify these Terms at any time. We will notify users of any significant changes by updating the date at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Contact Information</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                If you have any questions about these Terms, please contact the maintainers via our open-source repository or support channels.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
