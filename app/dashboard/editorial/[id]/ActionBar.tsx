"use client";

import { useState, useTransition } from "react";
import { approveSubmission, rejectSubmission } from "@/app/actions/submissions";

type ActionBarProps = {
  submissionId: string;
};

export default function EditorialActionBar({ submissionId }: ActionBarProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      await approveSubmission(submissionId);
    });
  };

  const handleReject = () => {
    if (!feedbackNote.trim()) return;
    startTransition(async () => {
      await rejectSubmission(submissionId, feedbackNote);
    });
  };

  return (
    <footer
      className="sticky bottom-0 z-20 border-t border-[#E5E5E5] bg-white"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Rejection textarea — revealed on "Reject" click */}
      {showRejectForm && (
        <div className="px-8 py-5 border-b border-[#E5E5E5]">
          <label
            htmlFor="rejection-feedback"
            className="block text-[11px] uppercase tracking-[0.1em] text-[#666666] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Reason for Rejection
            <span className="text-black ml-1">*</span>
          </label>
          <textarea
            id="rejection-feedback"
            value={feedbackNote}
            onChange={(e) => setFeedbackNote(e.target.value)}
            placeholder="Provide clear, constructive feedback for the contributor…"
            rows={3}
            className="w-full bg-transparent text-[14px] leading-[1.7] text-black placeholder:text-[#CCCCCC] outline-none resize-none transition-all duration-200"
            style={{
              fontFamily: "'Inter', sans-serif",
              borderBottom: "1px solid #E5E5E5",
            }}
            onFocus={(e) => { e.target.style.borderBottom = "1px solid #000000"; }}
            onBlur={(e) => { e.target.style.borderBottom = "1px solid #E5E5E5"; }}
            autoFocus
          />
          {feedbackNote.trim().length === 0 && (
            <p
              className="mt-2 text-[11px] text-[#999999]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Feedback is required to reject a submission.
            </p>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="px-8 py-4 flex items-center justify-between gap-4">
        <button
          id="editorial-reject-btn"
          onClick={() => {
            if (showRejectForm && feedbackNote.trim()) {
              handleReject();
            } else {
              setShowRejectForm(!showRejectForm);
            }
          }}
          disabled={isPending || (showRejectForm && !feedbackNote.trim() && false)}
          className="px-6 py-3 text-[13px] font-medium uppercase tracking-[0.06em] border border-[#E5E5E5] text-[#666666] hover:border-black hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-40"
          style={{ borderRadius: 0, fontFamily: "'Inter', sans-serif" }}
        >
          {showRejectForm
            ? feedbackNote.trim()
              ? isPending
                ? "Rejecting…"
                : "Confirm Rejection"
              : "Cancel"
            : "Reject"}
        </button>

        {showRejectForm && (
          <button
            onClick={() => {
              setShowRejectForm(false);
              setFeedbackNote("");
            }}
            className="text-[13px] text-[#999999] hover:text-black transition-colors focus-visible:outline-none focus-visible:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Cancel
          </button>
        )}

        <div className="flex items-center gap-3 ml-auto">
          <a
            href={`/dashboard/editorial/${submissionId}/edit`}
            className="px-6 py-3 text-[13px] font-medium uppercase tracking-[0.06em] border border-[#E5E5E5] text-[#666666] hover:border-black hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            style={{ borderRadius: 0, fontFamily: "'Inter', sans-serif" }}
          >
            Edit Submission
          </a>

          <button
            id="editorial-approve-btn"
            onClick={handleApprove}
            disabled={isPending || showRejectForm}
            className="px-8 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-white transition-opacity disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            style={{
              backgroundColor: "#000000",
              borderRadius: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {isPending ? "Publishing…" : "Approve & Publish"}
          </button>
        </div>
      </div>
    </footer>
  );
}
