"use client";

import { useState } from "react";
import ProblemInput from "./components/ProblemInput";
import ActionCard from "./components/ActionCard";
import LoadingState from "./components/LoadingState";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getClientId } from "@/lib/client-id";

type Suggestion = {
  blocker: string;
  action: string;
  reason: string;
  time: string;
  sessionId: string;
  actionId: string;
};

export default function Home() {
  const [problem, setProblem] = useState("");
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [previousActions, setPreviousActions] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSuggestion = async (
    excludedActions: string[] = [],
    activeSessionId: string | null = sessionId,
  ) => {
    if (problem.trim().length < 10 || loading) return;

    setLoading(true);
    setError("");
    setSuggestion(null);
    setCompleted(false);

    try {
      const response = await fetch("/api/unstuck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem,
          clientId: getClientId(),
          previousActions: excludedActions.slice(-10),
          sessionId: activeSessionId ?? undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuggestion(data);
      setSessionId(data.sessionId);

      setPreviousActions((current) =>
        [...new Set([...current, data.action])].slice(-10),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate a suggestion.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (problem.trim().length < 10 || loading) return;

    setPreviousActions([]);
    setSessionId(null);
    generateSuggestion([], null);
  };

  const handleDifferentSuggestion = () => {
    if (!suggestion || loading) return;

    const updatedActions = [...previousActions, suggestion.action].slice(-10);

    setPreviousActions(updatedActions);
    generateSuggestion(updatedActions, suggestion.sessionId);
  };

  const handleNextStep = () => {
    if (!suggestion || !completed || loading) return;

    generateSuggestion(previousActions, suggestion.sessionId);
  };

  const handleComplete = async () => {
    if (!suggestion || completed || loading) return;

    setError("");

    try {
      const response = await fetch(
        `/api/actions/${suggestion.actionId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId: getClientId(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to complete action.");
      }

      setCompleted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete this action.",
      );
    }
  };

  const handleReset = () => {
    setSuggestion(null);
    setSessionId(null);
    setProblem("");
    setPreviousActions([]);
    setCompleted(false);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#F8F8F5] text-[#242820]">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 pb-20 pt-20">
        <div className="mb-5 inline-flex rounded-full border border-[#DDE2D7] px-4 py-2 text-xs text-[#65745B]">
          YOUR PERSONAL CLARITY SPACE
        </div>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Too much on your mind?
          <br />
          <span className="text-[#829078]">Let's start small.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-gray-500">
          You don't need to figure everything out right now. Tell us what's
          going on. We'll help you find one small step forward.
        </p>

        <ProblemInput
          problem={problem}
          setProblem={setProblem}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {loading && <LoadingState />}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {suggestion && (
          <ActionCard
            {...suggestion}
            completed={completed}
            onComplete={handleComplete}
            onDifferent={handleDifferentSuggestion}
            onNext={handleNextStep}
            onReset={handleReset}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}