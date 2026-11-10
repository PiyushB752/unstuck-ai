import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E8E1] bg-[#F8F9F6]/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon.svg" alt="Unstuck AI logo" width={36} height={36} className="h-9 w-9 rounded-xl" />
          <span className="text-lg font-semibold tracking-tight text-[#252820]">
            Unstuck AI
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-gray-600 transition hover:text-[#68785F]"
          >
            Home
          </Link>

          <Link
            href="/history"
            className="text-gray-600 transition hover:text-[#68785F]"
          >
            My History
          </Link>
        </div>
      </nav>
    </header>
  );
}
