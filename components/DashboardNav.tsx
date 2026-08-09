"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type DashboardNavProps = {
  userEmail: string;
  userRole: string;
};

const CONTRIBUTOR_LINKS = [
  { href: "/dashboard/contributor", label: "My Submissions" },
  { href: "/dashboard/submit", label: "New Submission" },
];

const EDITOR_LINKS = [
  { href: "/dashboard/editorial", label: "Review Queue" },
  { href: "/dashboard/editorial/invite", label: "Invite Editor" },
];

export default function DashboardNav({ userEmail, userRole }: DashboardNavProps) {
  const pathname = usePathname();
  const isEditor = userRole === "editor";

  return (
    <aside
      className="w-[220px] shrink-0 min-h-screen flex flex-col border-r border-[#E5E5E5]"
      style={{ backgroundColor: "#ffffff" }}
    >
      
      <div className="px-6 py-6 border-b border-[#E5E5E5]">
        <Link
          href="/"
          className="block text-[14px] font-semibold tracking-tight text-black hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:underline"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          QWIKI
        </Link>
      </div>

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

      <nav className="flex-1 py-4" aria-label="Dashboard navigation">
        
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
    </aside>
  );
}
