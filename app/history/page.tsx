"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SessionHistory from "../components/SessionHistory";
import { getClientId } from "../../lib/client-id";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


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

export default function HistoryPage() {
  const [history, setHistory] = useState<HistorySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [clearError, setClearError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadHistory() {
    try {
      setLoading(true);
      setError("");

      const clientId = getClientId();

      const response = await fetch(
        `/api/history?clientId=${encodeURIComponent(clientId)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load history.");
      }

      setHistory(data.history || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load your history."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function handleDelete(actionId: string) {
    if (deletingId || clearing) return;

    try {
      setDeletingId(actionId);
      setError("");

      const response = await fetch(`/api/actions/${actionId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: getClientId(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete action.");
      }

      setHistory((current) =>
        current.map((session) => ({
          ...session,
          actions: session.actions.filter(
            (action) => action.id !== actionId
          ),
        }))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete action."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDeleteSession(sessionId: string) {
    if (deletingId || clearing) return;

    try {
      setDeletingId(sessionId);
      setError("");

      const response = await fetch(`/api/sessions/${sessionId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: getClientId(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete problem.");
      }

      setHistory((current) =>
        current.filter((session) => session.id !== sessionId)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete problem."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleClearHistory() {
    if (clearing || deletingId) return;

    try {
      setClearing(true);
      setClearError("");

      const response = await fetch("/api/history/clear", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: getClientId(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to clear history.");
      }

      setHistory([]);
      setShowClearConfirmation(false);
    } catch (err) {
      setClearError(
        err instanceof Error ? err.message : "Unable to clear history."
      );
    } finally {
      setClearing(false);
    }
  }

  const totalActions = history.reduce(
    (total, session) => total + session.actions.length,
    0
  );

  const completedActions = history.reduce(
    (total, session) =>
      total +
      session.actions.filter(
        (action) => action.status === "Completed"
      ).length,
    0
  );

  return (
    <main className="min-h-screen bg-[#F8F8F5] text-[#242820]">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 pb-20 pt-16">
        <p className="text-xs font-semibold tracking-widest text-[#829078]">
          YOUR PROGRESS
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Your history
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          Every problem, every small step, all in one place.
        </p>

        {!loading && !error && (
          <>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[#E7E8E1] bg-white p-4">
                <p className="text-xs text-gray-400">PROBLEMS</p>
                <p className="mt-2 text-2xl font-semibold">
                  {history.length}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7E8E1] bg-white p-4">
                <p className="text-xs text-gray-400">ACTIONS</p>
                <p className="mt-2 text-2xl font-semibold">
                  {totalActions}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7E8E1] bg-white p-4">
                <p className="text-xs text-gray-400">COMPLETED</p>
                <p className="mt-2 text-2xl font-semibold">
                  {completedActions}
                </p>
              </div>
            </div>

            {history.length > 0 && (
              <div className="mt-8 flex flex-col items-end gap-3">
                <button
                  onClick={() => {
                    setClearError("");
                    setShowClearConfirmation(true);
                  }}
                  disabled={!!deletingId || clearing}
                  className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:opacity-50"
                >
                  Clear all history
                </button>

                {showClearConfirmation && (
                  <div className="w-full rounded-xl border border-red-200 bg-red-50 p-5">
                    <h3 className="font-semibold text-red-800">
                      Clear all your history?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-red-700">
                      This will permanently delete all your saved problems
                      and actions. This cannot be undone.
                    </p>

                    {clearError && (
                      <p className="mt-3 text-sm text-red-700">
                        {clearError}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={handleClearHistory}
                        disabled={clearing || !!deletingId}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {clearing
                          ? "Clearing..."
                          : "Yes, clear everything"}
                      </button>

                      <button
                        onClick={() => {
                          setShowClearConfirmation(false);
                          setClearError("");
                        }}
                        disabled={clearing}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E7E8E1] bg-white py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E3E8DE] border-t-[#68785F]" />
              <p className="mt-4 text-sm text-[#777D72]">
                Loading your history...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm text-red-700">{error}</p>

              <button
                onClick={loadHistory}
                className="mt-4 rounded-lg bg-[#68785F] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#53634C]"
              >
                Try again
              </button>
            </div>
          ) : (
            <SessionHistory
              history={history}
              onDelete={handleDelete}
              onDeleteSession={handleDeleteSession}
            />
          )}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-xl bg-[#68785F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#53634C]"
          >
            Find my next step →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
