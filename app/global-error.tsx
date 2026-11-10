"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F9F6]">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-sm font-semibold tracking-widest text-[#829078]">
              UNSTUCK AI
            </p>

            <h1 className="mt-6 text-3xl font-semibold text-[#252820]">
              Something unexpected happened.
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              We couldn't load the application. Please try again.
            </p>

            <button
              onClick={() => reset()}
              className="mt-7 rounded-xl bg-[#68785F] px-6 py-3 text-sm font-medium text-white hover:bg-[#53634C]"
            >
              Reload application →
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}