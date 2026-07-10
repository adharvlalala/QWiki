"use client";

import { useActionState } from "react";
import { inviteEditor } from "@/app/actions/invite";
import Link from "next/link";

export default function InviteEditorPage() {
  const [state, action, pending] = useActionState(inviteEditor, undefined);

  return (
    <div className="max-w-[600px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#E5E5E5]">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/dashboard/editorial"
            className="text-[12px] text-[#999999] hover:text-black transition-colors focus-visible:outline-none focus-visible:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ← Review Queue
          </Link>
        </div>
        <p
          className="text-[11px] uppercase tracking-[0.1em] text-[#999999] mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Editorial Dashboard
        </p>
        <h1
          className="text-[32px] font-semibold tracking-[-0.02em] text-black"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Invite an Editor
        </h1>
      </div>

      <p
        className="text-[15px] leading-[165%] text-[#5e5e5e] mb-10"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Invite a trusted contributor to join the editorial team. They will
        receive a magic-link invitation email. If they are already a QWiki
        user, they will be immediately promoted to the editor role.
      </p>

      {state?.success ? (
        <div>
          <div
            className="mb-6 py-4"
            style={{ borderLeft: "2px solid #000000", paddingLeft: "16px" }}
          >
            <p
              className="text-[15px] font-medium text-black"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Invitation sent.
            </p>
            <p
              className="text-[14px] text-[#666666] mt-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              If the user is new to QWiki, they will receive an invitation
              email. Existing users have been promoted to editor immediately.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-[13px] font-medium underline underline-offset-4 text-black hover:opacity-60 transition-opacity"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Invite another editor
          </button>
        </div>
      ) : (
        <form action={action} className="space-y-8" noValidate>
          {/* Email field */}
          <div>
            <label
              htmlFor="invite-email"
              className="block text-[11px] uppercase tracking-[0.08em] text-[#666666] mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Email Address
            </label>
            <input
              id="invite-email"
              name="email"
              type="email"
              required
              placeholder="editor@email.com"
              className="w-full bg-transparent text-[16px] text-black placeholder:text-[#CCCCCC] outline-none py-2 transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderBottom: "1px solid #E5E5E5",
              }}
              onFocus={(e) => { e.target.style.borderBottom = "1px solid #000000"; }}
              onBlur={(e) => { e.target.style.borderBottom = "1px solid #E5E5E5"; }}
            />
          </div>

          {state?.error && (
            <div
              className="py-3"
              style={{ borderLeft: "2px solid #000000", paddingLeft: "16px" }}
            >
              <p
                className="text-[13px] text-black"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {state.error}
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              id="invite-submit"
              type="submit"
              disabled={pending}
              className="px-8 py-4 text-[13px] font-medium uppercase tracking-[0.06em] text-white transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              style={{
                backgroundColor: "#000000",
                borderRadius: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {pending ? "Sending Invitation…" : "Send Invitation"}
            </button>
          </div>

          <div
            className="pt-4 border-t border-[#E5E5E5]"
          >
            <p
              className="text-[12px] text-[#AAAAAA] leading-[165%]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <strong className="text-[#666666]">Note:</strong> This action
              requires a{" "}
              <code
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
              >
                SUPABASE_SERVICE_ROLE_KEY
              </code>{" "}
              environment variable. Add it to your{" "}
              <code
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
              >
                .env.local
              </code>{" "}
              to enable invitations.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
