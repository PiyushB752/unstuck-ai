"use client";

type ProblemInputProps = {
  problem: string;
  setProblem: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function ProblemInput({
  problem,
  setProblem,
  onSubmit,
  loading,
}: ProblemInputProps) {
  const trimmedProblem = problem.trim();
  const isTooShort = trimmedProblem.length > 0 && trimmedProblem.length < 10;
  const isTooLong = problem.length >= 2000;

  return (
    <div className="mt-12 rounded-2xl border border-[#E7E8E1] bg-white p-5 shadow-sm sm:p-7">
      <label className="mb-4 block text-sm font-medium">
        What's on your mind?
      </label>

      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value.slice(0, 2000))}
        maxLength={2000}
        placeholder="I have exams next week, a college project to finish, and I don't know where to start..."
        className="min-h-40 w-full resize-none rounded-xl border border-[#E6E8E1] bg-[#FBFBF9] p-4 text-sm leading-7 outline-none transition focus:border-[#829078]"
      />

      <div className="mt-2 flex justify-between text-xs">
        <span className={isTooShort ? "text-red-500" : "text-gray-400"}>
          {isTooShort
            ? "Please write at least 10 characters."
            : "Start wherever you are."}
        </span>

        <span className={isTooLong ? "text-amber-600" : "text-gray-400"}>
          {problem.length}/2000
        </span>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <span className="text-xs text-gray-400">
          No need to organize your thoughts first.
        </span>

        <button
          onClick={onSubmit}
          disabled={trimmedProblem.length < 10 || loading}
          className="rounded-xl bg-[#68785F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#53634C] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Finding your next step..." : "Help me get unstuck →"}
        </button>
      </div>
    </div>
  );
}