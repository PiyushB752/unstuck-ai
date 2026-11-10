import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9F6] px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-[#68785F] hover:underline"
        >
          ← Back to Unstuck AI
        </Link>

        <h1 className="mt-10 text-3xl font-semibold text-[#252820]">
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Last updated: November 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-gray-600">
          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By using Unstuck AI, you agree to these terms. If you do not
              agree, please stop using the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              2. Purpose of the Application
            </h2>
            <p className="mt-2">
              Unstuck AI is a productivity assistance tool designed to turn
              user-submitted problems into small, actionable suggestions.
              Suggestions are generated using artificial intelligence.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              3. AI-Generated Suggestions
            </h2>
            <p className="mt-2">
              AI-generated suggestions may occasionally be inaccurate,
              incomplete, or unsuitable for your situation. You are
              responsible for deciding whether to follow them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              4. Acceptable Use
            </h2>
            <p className="mt-2">
              You agree not to misuse the application, attempt unauthorized
              access, disrupt its services, or use it for unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              5. Availability
            </h2>
            <p className="mt-2">
              We aim to keep Unstuck AI available, but we cannot guarantee
              uninterrupted access. Features may change or become temporarily
              unavailable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              6. Limitation of Liability
            </h2>
            <p className="mt-2">
              Unstuck AI is provided for general productivity assistance.
              The development team is not responsible for decisions made
              solely on the basis of AI-generated suggestions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              7. Changes to These Terms
            </h2>
            <p className="mt-2">
              These terms may be updated as the application develops.
              Continued use of the application constitutes acceptance of
              updated terms.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}