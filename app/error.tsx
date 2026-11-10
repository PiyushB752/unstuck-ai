"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9F6] px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF2E9]">
          <span className="text-2xl text-[#68785F]">!</span>
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-[#252820]">
          Something went wrong.
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          Don't worry. Your next step is just one click away. Try loading the
          page again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-7 rounded-xl bg-[#68785F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#53634C]"
        >
          Try again →
        </button>
      </div>
    </main>
  );
}