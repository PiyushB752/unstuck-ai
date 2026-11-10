import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9F6] px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold tracking-widest text-[#829078]">
          UNSTUCK AI
        </p>

        <h1 className="mt-6 text-7xl font-semibold text-[#68785F]">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-semibold text-[#252820]">
          Looks like you've hit a dead end.
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          This page doesn't exist, but you can always find your next step.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-[#68785F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#53634C]"
        >
          Back to home →
        </Link>
      </div>
    </main>
  );
}