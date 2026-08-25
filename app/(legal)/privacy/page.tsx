import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-[#5e5e5e] text-sm">Last Updated: August 24, 2026</p>
          </div>

          <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-blue-600 space-y-6">
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                At QWiki, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit and interact with our free, non-profit, open-source educational platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                As a non-profit open-source project, we only collect the minimum amount of data necessary to run the platform effectively.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-[#4a4a4a]">
                <li><strong>Account Information:</strong> When you sign in (e.g., via Google OAuth), we collect your name, email address, and profile picture to associate with your editor profile and track your article contributions.</li>
                <li><strong>Contributions:</strong> Any articles, edits, or comments you submit are stored publicly on the platform and attributed to your user profile.</li>
                <li><strong>Usage Data:</strong> We may collect anonymous, non-personally identifiable technical information (like browser type and page views) to understand how the platform is used and to improve performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-[#4a4a4a]">
                <li>To authenticate you and maintain your contributor session securely.</li>
                <li>To attribute your edits and articles to you publicly, upholding the integrity of the wiki's editorial history.</li>
                <li>To communicate with you regarding your contributions or account status (we do not send marketing emails).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies and Authentication</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                We use secure, essential cookies exclusively to manage your login session via our secure authentication provider. We do not use third-party tracking or advertising cookies. You can disable cookies in your browser, but doing so will prevent you from logging in and contributing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Data Sharing and Third Parties</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                We <strong>never</strong> sell your personal data to third parties. We only share data with infrastructure providers strictly necessary to operate the platform:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-[#4a4a4a]">
                <li><strong>Cloud Infrastructure Providers:</strong> For secure database hosting, application serving, and user authentication.</li>
              </ul>
              <p className="leading-relaxed text-[#4a4a4a] mt-2">
                Please note that because QWiki is a public knowledge base, any text you contribute to articles will be visible to the public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights and Data Deletion</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                You have the right to request access to or deletion of your personal data. If you wish to delete your account, please contact us. Note that for archival and historical integrity, your past public edits may remain on the site but will be anonymized or decoupled from your personal email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
              <p className="leading-relaxed text-[#4a4a4a]">
                If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to the project maintainers via our open-source repository.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
