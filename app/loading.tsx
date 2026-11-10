export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9F6] px-6">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#68785F]">
          <span className="text-xl font-semibold text-white">U</span>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-[#252820]">
          Unstuck AI
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Making things simpler...
        </p>

        <div className="mx-auto mt-6 h-1.5 w-32 overflow-hidden rounded-full bg-[#E7EAE2]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#829078]" />
        </div>
      </div>
    </main>
  );
}