"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type DashboardNavProps = {
  userEmail: string;
  userRole: string;
  isOpen?: boolean;
  onClose?: () => void;
};

const CONTRIBUTOR_LINKS = [
  { href: "/dashboard/contributor", label: "My Submissions" },
  { href: "/dashboard/submit", label: "New Submission" },
];

const EDITOR_LINKS = [
  { href: "/dashboard/editorial", label: "Review Queue" },
  { href: "/dashboard/editorial/invite", label: "Invite Editor" },
];

export default function DashboardNav({
  userEmail,
  userRole,
  isOpen = false,
  onClose,
}: DashboardNavProps) {
  const pathname = usePathname();
  const isEditor = userRole === "editor";

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo / brand */}
      <div className="px-6 py-6 border-b border-[#E5E5E5] flex items-center justify-between">
        <Link
          href="/"
          className="block text-[14px] font-semibold tracking-tight text-black hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:underline"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          onClick={onClose}
        >
          QWIKI
        </Link>
        {/* Close button — only visible in mobile drawer mode */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 text-[#999999] hover:text-black transition-colors focus-visible:outline-none"
            aria-label="Close navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-6 py-5 border-b border-[#E5E5E5]">
        <p
          className="text-[11px] text-[#999999] uppercase tracking-[0.08em] mb-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Signed in as
        </p>
        <p
          className="text-[12px] text-black truncate mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {userEmail}
        </p>
        <span
          className="inline-block text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 border border-[#000000] text-black"
          style={{ fontFamily: "'JetBrains Mono', monospace", borderRadius: 0 }}
        >
          {userRole}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-4 overflow-y-auto" aria-label="Dashboard navigation">
        <div className="mb-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 text-[13px] border-b border-[#E5E5E5] text-[#5e5e5e] hover:text-black hover:bg-[#F9F9F9] transition-colors focus-visible:outline-none focus-visible:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>←</span>
            <span>Back to Wiki</span>
          </Link>
        </div>

        <div className="mb-4">
          <p
            className="px-6 py-2 text-[10px] uppercase tracking-[0.1em] text-[#AAAAAA]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Contributor
          </p>
          {CONTRIBUTOR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "block px-6 py-3 text-[13px] border-b border-[#E5E5E5] transition-colors",
                "focus-visible:outline-none focus-visible:underline",
                pathname === link.href
                  ? "text-black font-medium bg-[#F9F9F9]"
                  : "text-[#5e5e5e] hover:text-black hover:bg-[#F9F9F9]"
              )}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {isEditor && (
          <div>
            <p
              className="px-6 py-2 text-[10px] uppercase tracking-[0.1em] text-[#AAAAAA]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Editorial
            </p>
            {EDITOR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "block px-6 py-3 text-[13px] border-b border-[#E5E5E5] transition-colors",
                  "focus-visible:outline-none focus-visible:underline",
                  pathname === link.href
                    ? "text-black font-medium bg-[#F9F9F9]"
                    : "text-[#5e5e5e] hover:text-black hover:bg-[#F9F9F9]"
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Sign out */}
      <div className="border-t border-[#E5E5E5]">
        <form action={signOut}>
          <button
            id="dashboard-signout"
            type="submit"
            className="w-full px-6 py-4 text-left text-[13px] text-[#999999] hover:text-black hover:bg-[#F9F9F9] transition-colors focus-visible:outline-none focus-visible:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on md+ */}
      <aside
        className="hidden md:flex flex-col w-[220px] shrink-0 min-h-screen border-r border-[#E5E5E5] bg-white"
      >
        {navContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <aside
            className="relative w-[280px] max-w-[85vw] h-full bg-white border-r border-[#E5E5E5] flex flex-col z-10"
            style={{
              animation: "slideIn 0.2s ease-out",
            }}
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Slide-in animation */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
