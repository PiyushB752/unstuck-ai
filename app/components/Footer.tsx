import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E7E8E1] bg-[#F8F9F6] px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-[#68785F]">
            Unstuck AI
          </p>
          <p className="mt-1 text-xs text-gray-400">
            One small step at a time.
          </p>
        </div>

        <nav className="flex items-center gap-6 text-xs text-gray-500">
          <Link href="/privacy" className="hover:text-[#68785F]">
            Privacy Policy
          </Link>

          <Link href="/terms" className="hover:text-[#68785F]">
            Terms of Service
          </Link>

          <Link href="/history" className="hover:text-[#68785F]">
            History
          </Link>
        </nav>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Unstuck AI
        </p>
      </div>
    </footer>
  );
}