"use client";

import { useState } from "react";

type HistoryAction = {
  id: string;
  blocker: string;
  action: string;
  reason: string;
  time: string;
  status: string;
  createdAt: string;
};

type HistorySession = {
  id: string;
  problem: string;
  createdAt: string;
  actions: HistoryAction[];
};

type SessionHistoryProps = {
  history: HistorySession[];
  onDelete: (actionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
};

export default function SessionHistory({
  history,
  onDelete,
  onDeleteSession,
}: SessionHistoryProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <p className="rounded-2xl border border-[#E7E8E1] bg-white p-8 text-center text-sm text-gray-500">
        No actions yet. Your progress will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {history.map((session) => (
        <article
          key={session.id}
          className="rounded-2xl border border-[#E7E8E1] bg-white p-6 sm:p-7"
        >
          <p className="text-xs font-semibold tracking-widest text-[#829078]">
            ORIGINAL PROBLEM
          </p>

          <h2 className="mt-3 text-lg font-semibold leading-7">
            {session.problem}
          </h2>

          <p className="mt-2 text-xs text-gray-400">
            {new Date(session.createdAt).toLocaleDateString()}
          </p>

          {/* Delete entire session */}
          <div className="mt-4">
            <button
              onClick={() => setDeleteSessionId(session.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 active:scale-95"
            >
              Delete entire problem
            </button>

            {deleteSessionId === session.id && (
              <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">
                  Delete this entire problem and all its actions?
                </p>

                <p className="mt-1 text-xs text-red-600">
                  This cannot be undone.
                </p>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      onDeleteSession(session.id);
                      setDeleteSessionId(null);
                    }}
                    className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Yes, delete
                  </button>

                  <button
                    onClick={() => setDeleteSessionId(null)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Session actions */}
          <div className="mt-6 space-y-4">
            {session.actions.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#E9EAE4] bg-[#FBFBF9] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[#829078]">
                    ACTION {index + 1}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.status === "Completed"
                        ? "bg-[#EDF2E9] text-[#65745B]"
                        : "bg-[#F5F1E8] text-[#8A744B]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium">
                  {item.action}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.reason}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  Estimated time: {item.time}
                </p>

                {/* Delete individual action */}
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="m19 6-1 14H6L5 6" />
                    <path d="M10 11v5M14 11v5" />
                  </svg>
                  Delete action
                </button>

                {deleteId === item.id && (
                  <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-800">
                      Delete this action permanently?
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                      This action cannot be recovered.
                    </p>

                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() => {
                          onDelete(item.id);
                          setDeleteId(null);
                        }}
                        className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Yes, delete
                      </button>

                      <button
                        onClick={() => setDeleteId(null)}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}